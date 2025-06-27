import { defineWxtModule } from 'wxt/modules'
import path from 'path'
import fs from 'fs'

export default defineWxtModule({
  setup(wxt) {
    wxt.hook('server:started', (wxt, server) => {
      const injection = path.resolve(
        wxt.config.root,
        'src/entrypoints/injection.scss',
      )
      const themes_dir = path.resolve(wxt.config.root, 'src/lib/themes')
      server.watcher.add(themes_dir)
      server.watcher.on('change', async file => {
        if (file.endsWith('.scss')) {
          console.log(
            '[scss-hmr] Invalidating module: ',
            path.relative(wxt.config.root, injection),
          )

          await wxt.builder.build({
            type: 'unlisted-style',
            name: 'injection',
            options: {},
            inputPath: injection,
            outputDir: path.resolve(wxt.config.outDir, 'assets'),
          })

          server.reloadExtension()
        }
      })
    })
  },
})
