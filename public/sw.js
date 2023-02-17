importScripts('./dip/dip.worker.js');
importScripts('./uv/uv.sw.js');

const sw = new UVServiceWorker();
const sw2 = new DIPServiceWorker('./dip/dip.worker.js');

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(location.origin+'/usedservice/fip/')) event.respondWith(sw2.fetch(event));
  if (event.request.url.startsWith(location.origin+'/usedservice/uv/')) event.respondWith(sw.fetch(event));
});
