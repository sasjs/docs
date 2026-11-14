/*
 * Retired service worker - replaces the docsify offline worker (Copyright 2016
 * @huxpro, Apache 2.0) that this folder used to ship.
 *
 * This file used to be the docsify offline worker: it answered from the cache
 * first and revalidated afterwards, so every page a visitor had opened once was
 * served from the cache on the next visit. After a deploy that meant the old
 * documentation - including a page whose whole configuration had changed - with
 * no way for the site to correct itself.
 *
 * Nothing here is cached now. The worker exists only to remove itself, and the
 * cache it wrote, from browsers that installed it: a script that is merely
 * deleted leaves the installed worker running, so the replacement has to do the
 * uninstalling.
 */
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()

      const clients = await self.clients.matchAll({ type: 'window' })
      for (const client of clients) client.navigate(client.url)
    })()
  )
})
