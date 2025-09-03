import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import Metalsmith from 'metalsmith'
import collections from '@metalsmith/collections'
import layouts from '@metalsmith/layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'
import sass from '@metalsmith/sass'
import esbuild from '@metalsmith/js-bundle';


const __dirname = dirname(fileURLToPath(import.meta.url))
const t1 = performance.now()
const devMode = process.env.NODE_ENV === 'development'

Metalsmith(__dirname)
  .metadata({
    sitename: 'My Static Site & Blog',
    description: "It's about saying »Hello« to the World.",
    generator: 'Metalsmith',
    url: 'https://metalsmith.io/'
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(
    sass({
      loadPaths: ['node_modules']
    })
  )
  .use(
    esbuild({
      entries: {
        'assets/scripts': 'src/js/main.js'
      }
    })
  )
  .use(
    collections({
      posts: 'posts/*.md'
    })
  )
  .use(markdown())
  .use(permalinks())
  .use(
    layouts({
      engineOptions: {
        helpers: {
          formattedDate: function (date) {
            return new Date(date).toLocaleDateString()
          }
        }
      }
    })
  )
  .build(function (err, files) {
    if (err) throw err
    console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`)
  })