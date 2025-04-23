import axios, { AxiosRequestConfig } from "axios"
import Bottleneck from "bottleneck"
import chalk from "chalk"
import filenamify from "filenamify"
import { mkdirp, pathExists, writeFile } from "fs-extra"
import { dirname } from "path"

const cache: { [index: string]: Promise<any> } = {}

const limiter = new Bottleneck({
  maxConcurrent: 5,
  reservoir: 10,
  reservoirRefreshAmount: 10,
  reservoirRefreshInterval: 100,
})

const isApiRequest = /\bapi\b/

/**
 * This serves as a download proxy and caches downloaded
 * files for faster local development.
 */
export async function download(url: string, options: AxiosRequestConfig): Promise<string> {
  const filename = "download-cache/" + url
    .replace(/\\/g, "/")
    .replace("https://", "")
    .split("/")
    .map(segment => filenamify(segment))
    .join("/")

  if (cache[filename]) {
    return cache[filename]
  }

  if (await pathExists(filename)) {
    cache[filename] = Promise.resolve(filename)
    return cache[filename];
  }

  const config = Object.assign({}, options, {
    url,
    method: "get",
  })

  cache[filename] = limiter.schedule(() => {
    console.log(chalk.gray("Download " + url))
    return axios.request(config)
  })

  let data = isApiRequest.test(filename)
    ? JSON.stringify({}, null, 2)
    : ""

  try {
    const response = await cache[filename]
    data = isApiRequest.test(filename)
      ? JSON.stringify(response.data, null, 2)
      : options.responseType === 'arraybuffer'
        ? response.data
        : response.data

    // Patch for wrong format
    if(url == "https://api.projectceleste.com/gamedb/languages?language=English") {
      const obj = keyLanguage(response.data)
      data = JSON.stringify(obj, null, 2)
    } else if(url == "https://api.projectceleste.com/gamedb/materials" || url == "https://api.projectceleste.com/gamedb/traits") {
      const obj = keyName(response.data)
      data = JSON.stringify(obj, null, 2)
    }

    await mkdirp(dirname(filename))
    await writeFile(filename, data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn(chalk.yellow(`Resource not found (404): ${url}`))
      return Promise.resolve(filename)
    }
    
    if (error instanceof Error) {
      console.error('Error downloading:', error.stack)
    } else {
      console.error('An unknown error occurred:', error)
    }
    throw error // Re-throw the error to be handled by the caller
  }

  return Promise.resolve(filename)
}


function keyLanguage<T>(json: T) {
  // Convert new format to old format
  // Change array to object
  const obj = {}

  for(let key in json) {
    const entry = json[key]
    obj[entry['id']] = entry

    const langObj = {}
    for(let keyLang in entry['language']) {
      const lang = entry['language'][keyLang]
      langObj[lang.name] = lang
    }
    delete entry['language']
    entry['language'] = langObj

    // Use key-value instead of array
    for(let keyLang in entry['language']) {
      const lang = obj[entry['id']]['language'][keyLang]
      const str = {}
      for(let keyStr in lang.string) {
        const strEntry = lang.string[keyStr]
        str[strEntry["_locid"]] = strEntry
        delete strEntry["_locid"]
      }
      delete lang.string
      lang.string = str
    }
  }
  return obj
}

function keyName<T>(json: T) {
  const obj = {}

  for(let key in json) {
    const entry = json[key]
    obj[entry['name']] = entry
  }
  return obj
}
