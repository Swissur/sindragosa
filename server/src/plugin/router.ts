import type express from 'express'
import { buildPluginArchive, etagOf } from './archive.js'

/**
 * `GET /plugin` : le zip du plugin Isilwen. Public, comme les `.well-known`.
 * En prod le buffer est construit au premier appel puis garde en memoire ;
 * en dev il est reconstruit a chaque appel pour voir ses modifs.
 */
export function mountPlugin(app: express.Express): void {
  let cached: Promise<Buffer> | undefined

  app.get('/plugin', async (req, res) => {
    if (process.env.NODE_ENV !== 'production') cached = undefined
    cached ??= buildPluginArchive()
    const archive = await cached
    const etag = etagOf(archive)

    res.setHeader('ETag', etag)
    res.setHeader('Cache-Control', 'no-cache')
    if (req.headers['if-none-match'] === etag) {
      res.status(304).end()
      return
    }
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', 'attachment; filename="isilwen-plugin.zip"')
    res.send(archive)
  })
}
