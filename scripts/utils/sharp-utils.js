const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');
const { ensureDir } = require('fs-extra');
const through = require('through2');
const { promisify } = require('util');

/**
 * Creates a Gulp stream that processes images using Sharp
 * @param {Object} options - Configuration options
 * @param {Array} options.images - Array of image configurations
 * @param {boolean} options.silent - Whether to suppress console output
 * @returns {Stream} Gulp stream
 */
function sharpStream(options) {
  const { images, silent = true } = options;
  
  return through.obj(async function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new Error('Streaming not supported'));
    }

    try {
      const buffer = file.contents;
      const results = [];

      for (const config of images) {
        const { width, height, quality = 100, rename } = config;
        
        let sharpInstance = sharp(buffer);
        
        // Apply resize if width or height is specified
        if (width || height) {
          sharpInstance = sharpInstance.resize(width, height, {
            fit: 'fill',
            withoutEnlargement: true
          });
        }
        
        // Apply quality if specified
        if (quality) {
          sharpInstance = sharpInstance.png({ quality });
        }
        
        // Process the image
        const processedBuffer = await sharpInstance.toBuffer();
        
        // Create a new file for each processed image
        const newFile = file.clone();
        newFile.contents = processedBuffer;
        newFile.basename = rename || file.basename;
        
        results.push(newFile);
      }
      
      // Push all processed files to the stream
      results.forEach(result => this.push(result));
      cb();
    } catch (err) {
      if (!silent) {
        console.error(`Error processing ${file.basename}:`, err);
      }
      cb(err);
    }
  });
}

/**
 * Process a single image with Sharp
 * @param {string} inputPath - Path to input image
 * @param {Object} config - Image configuration
 * @param {string} outputPath - Path to output image
 * @returns {Promise} Resolves when processing is complete
 */
async function processImage(inputPath, config, outputPath) {
  const { width, height, quality = 100 } = config;
  
  let sharpInstance = sharp(inputPath);
  
  // Apply resize if width or height is specified
  if (width || height) {
    sharpInstance = sharpInstance.resize(width, height, {
      fit: 'fill',
      withoutEnlargement: true
    });
  }
  
  // Apply quality if specified
  if (quality) {
    sharpInstance = sharpInstance.png({ quality });
  }
  
  // Ensure output directory exists
  await ensureDir(path.dirname(outputPath));
  
  // Process and save the image
  return sharpInstance.toFile(outputPath);
}

/**
 * Process multiple images with Sharp
 * @param {string} inputPath - Path to input image
 * @param {Array} configs - Array of image configurations
 * @param {string} outputDir - Directory to save processed images
 * @returns {Promise} Resolves when all processing is complete
 */
async function processImages(inputPath, configs, outputDir) {
  const promises = configs.map(config => {
    const outputPath = path.join(outputDir, config.rename);
    return processImage(inputPath, config, outputPath);
  });
  
  return Promise.all(promises);
}

module.exports = {
  sharpStream,
  processImage,
  processImages
}; 