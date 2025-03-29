#!/usr/bin/env node

/**
 * Simple script to bundle modular OpenAPI files
 *
 * Usage: node bundle.js
 *
 * This script reads the modular OpenAPI spec from the openapi directory
 * and bundles it into a single file in api-docs/openapi.yaml
 */

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

// Paths
const baseDir = path.resolve(__dirname);
const openApiDir = path.join(baseDir, 'openapi');
const indexPath = path.join(openApiDir, 'index.yaml');
const outputPath = path.join(baseDir, 'openapi.yaml');

/**
 * Resolves $ref pointers in an OpenAPI spec
 */
function resolveRefs(obj, basePath) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveRefs(item, basePath));
  }

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === '$ref' && typeof value === 'string' && value.startsWith('./')) {
      // Resolve local file reference
      const refPath = path.resolve(path.dirname(basePath), value.split('#')[0]);

      try {
        const refContent = yaml.load(fs.readFileSync(refPath, 'utf8'));

        // Handle fragment identifier
        const fragment = value.split('#')[1];

        if (fragment) {
          const parts = fragment.split('/').filter(Boolean);
          let resolved = refContent;

          for (const part of parts) {
            resolved = resolved[part];

            if (resolved === undefined) {
              throw new Error(`Could not resolve reference: ${value} in file ${refPath}`);
            }
          }

          // Recursively resolve any references in the resolved content
          return resolveRefs(resolved, refPath);
        } else {
          return resolveRefs(refContent, refPath);
        }
      } catch (error) {
        console.error(`Error resolving reference ${value} from ${basePath}: ${error.message}`);
        throw error;
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested objects
      result[key] = resolveRefs(value, basePath);
    } else {
      result[key] = value;
    }
  }

  return result;
}

try {
  console.log('Bundling OpenAPI spec...');

  // Load the index file
  const indexContent = yaml.load(fs.readFileSync(indexPath, 'utf8'));

  // Resolve references
  const bundled = resolveRefs(indexContent, indexPath);

  // Write the bundled spec to the output file
  fs.writeFileSync(outputPath, yaml.dump(bundled, { lineWidth: -1 }));

  console.log(`Successfully bundled OpenAPI spec to ${outputPath}`);
} catch (error) {
  console.error('Error bundling OpenAPI spec:', error);
  process.exit(1);
}
