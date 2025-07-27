import {
  Advisors,
  Blueprints,
  Consumables,
  Designs,
  Languages,
  Marketplace,
  Materials,
  Prototypes,
  Traits,
  Powers
} from "../../api-types"
import { readJson } from "fs-extra"

import { download } from "./download"

import fs from "fs"

const cache = {}

async function fetch(path: string) {
  const url = "https://api.projectceleste.com" + path
  const options = { headers: { Accept: "application/json" } }

  const filename = await download(url, options)
  const res = await readJson(filename)

  return res
}

async function get<T extends { data: any }>(path: string): Promise<T["data"]> {
  return cache[path] = cache[path] || fetch(path)
}

function lowerCaseKeys<T>(json: T) {
  Object.keys(json).forEach(key => {
    if (key !== key.toLowerCase()) {
      json[key.toLowerCase()] = json[key]
      delete json[key]
    }
  })
}

function lowerCaseName<T>(json: T) {
  Object.values(json).forEach(value => {
    value.name = value.name.toLowerCase()
  })
}

function lowerCaseProtounit<T>(json: T) {
  Object.values(json).forEach(value => {
    value.protounit = value.protounit.toLowerCase()
  })
}

function find(json: any[], attributeName: string, value: string) {
  json.forEach(entry => {
    if(entry[attributeName] === value)
      return entry
  })
  return undefined
}

/*
function xmlToJson(xml) {

  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element
     // do attributes
     if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
           var attribute = xml.attributes.item(j);
           obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
     }
  } else if (xml.nodeType == 3) { // text
     obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
     for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
           obj[nodeName] = xmlToJson(item);
        } else {
           if (typeof(obj[nodeName].push) == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
           }
           obj[nodeName].push(xmlToJson(item));
        }
     }
  }
  return obj;
};
*/

export class API {

  static async getTraits() {
    const json = await get<Traits>("/gamedb/traits")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getAdvisors() {
    const json = await get<Advisors>("/gamedb/advisors")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getConsumables() {
    const json = await get<Consumables>("/gamedb/consumables")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getBlueprints() {
    const json = await get<Blueprints>("/gamedb/blueprints")

    lowerCaseKeys(json)
    lowerCaseName(json)
    lowerCaseProtounit(json)

    Object.values(json).forEach(entry => {
      entry.cost.material.forEach(input => {
        input.id = input.id.toLowerCase()
      })
    })

    return json
  }

  static async getDesigns() {
    const json = await get<Designs>("/gamedb/designs")

    lowerCaseKeys(json)
    lowerCaseName(json)

    Object.values(json).forEach(entry => {
      entry.input.material.forEach(input => {
        input.id = input.id.toLowerCase()
      })
    })
    Object.values(json).forEach(entry => {
      Object.keys(entry.output).forEach(type => {
        const output = entry.output[type]
        output.id = output.id.toLowerCase()
      })
    })

    return json
  }

  static async getPrototypes() {
    const json = await get<Prototypes>("/gamedb/units")
    // Convert new format to old format
    // Change array to object
    const obj = {}
    for(let key in json) {
      const entry = json[key]
      obj[entry.name] = entry
    }

    lowerCaseKeys(obj)
    lowerCaseName(obj)

    return obj
  }

  static async getMaterials() {
    const json = await get<Materials>("/gamedb/materials")
    lowerCaseKeys(json)
    lowerCaseName(json)
    return json
  }

  static async getLanguages() {
    const json = await get<Languages>("/gamedb/languages?language=English")
    return json
  }

  static async getVendors() {
    const json = await get<any>("/gamedb/vendors")

    lowerCaseKeys(json)
    lowerCaseName(json)
    lowerCaseProtounit(json)

    Object.values<any>(json).forEach(vendor => {
      const items = vendor.itemsets.itemset.items.item
      items.forEach(item => {
        Object.values<any>(item.purchase).forEach(sold => {
          sold.id = sold.id.toLowerCase()
        })
      })
    })

    return json
  }

  static async getMarketplace() {
    const json = await get<Marketplace>("/marketplace") // Missing
    json.forEach(offering => {
      offering.ItemID = offering.ItemID.toLowerCase()
    })
    return json
  }

  static async getPowers(){

/*
    const xml2js = require('xml2js');
    const fs = require('fs');

    // read XML from a file
    const xml = fs.readFileSync("./db/Powers.xml");

    // convert XML to JSON
    xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
        if (err) {
            throw err;
        }

        // `result` is a JavaScript object
        // convert it to a JSON string
        const json = JSON.stringify(result, null, 4);

        // save JSON in a file
        fs.writeFileSync("./db/Powers.json", json);

    }) */
    /*const res = await xmlToJson("./db/Powers.xml"); */

    /*const options = { headers: { Accept: "application/json" } }
    const filename = await download("./db/Powers.json", options)*/

    /*
    const options = {} 
  
    const filename = await download("./db/Powers.json",options)
    const res = await readJson(filename)
  

  
    return res
    */
  }


  static async getPowersNuggets() {
    const json = await get<Powers>("/gamedb/nuggets")
    /*lowerCaseKeys(json)
    lowerCaseName(json)
    */
    return json
  }

  static async getReforgeItemBlacklist() {
    const json = await get("/gamedb/ReforgeItemBlacklist")
    return json
  }

}
