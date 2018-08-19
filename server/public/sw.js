var staticCacheName = 'static-v1';
var dynamicCacheName = 'dynamic-v1';

const staticAssets = [
  '/',
  '/favorite',
  '/ads',
  '/addpage',
  '/category',
  '/signin',
  '/signup',
  '/search',
  '/chat',
  '/postAd',
  '/1-min.jpg',//change
  '/css/style.css',
  '/javascript/addPage.js',
  '/javascript/jquery-3.1.0.min.js',
  '/javascript/addSearch.js',
  '/javascript/chat.js',
  '/javascript/chatpage.js',
  '/javascript/fav.js',
  '/javascript/index.js',
  '/javascript/logcon.js',
  '/javascript/myads.js',
  '/javascript/postadd.js',
  '/javascript/signin.js',
  '/javascript/signup.js',
  '/javascript/firebase-config.js',
  '/javascript/category.js',
  '/javascript/addPage.js',
  '/css/bootstrap.min.css',
  '/css/font-awesome.min.css',
];

self.addEventListener('install', async (event) => {
  // event.waitUntil(
  //   caches.open('v1')
  //     .then(res => {
  //       console.log('wait.........!')
  //       return res.addAll(staticAssets);
  //     })
  // );
  // console.log('installed');
  var cache = await caches.open(staticCacheName);//hi
  cache.addAll(staticAssets);
});

self.addEventListener('activate', (event) => {
  console.log('activated');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== staticCacheName) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));//check
      })
  );
});

self.addEventListener('fetch', (ev) => {
  if (ev.request.method !== 'GET') {
    return;
  }
  //console.log('Fetch from Service Worker ', ev);
  const req = ev.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    ev.respondWith(cacheFirst(req));
  }
  try {
    return ev.respondWith(networkFirst(req));

  } catch{

  }
});

async function cacheFirst(req) {
  let cacheRes = await caches.match(req);
  return cacheRes || fetch(req);
}

async function networkFirst(req) {
  const dynamicCache = await caches.open(dynamicCacheName);
  try {
    const networkResponse = await fetch(req);
    dynamicCache.put(req, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cacheResponse = await caches.match(req);
    return cacheResponse;
  }
}