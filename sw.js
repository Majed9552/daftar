const C="sadad-2.3.2";const FILES=["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/kufi-ar-700.woff2", "fonts/kufi-la-700.woff2", "fonts/plex-ar-400.woff2", "fonts/plex-ar-500.woff2", "fonts/plex-ar-600.woff2", "fonts/plex-ar-700.woff2", "fonts/plex-la-400.woff2", "fonts/plex-la-500.woff2", "fonts/plex-la-600.woff2", "fonts/plex-la-700.woff2"];
const fresh=u=>fetch(new Request(u,{cache:"no-store"}));
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(f=>fresh(f).then(r=>{if(r.ok)return c.put(f,r)})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  const page=e.request.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
  if(page){/* the app page: newest from the network when online, saved copy when offline */
    e.respondWith(fresh(e.request.url).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>{c.put("index.html",cp.clone());c.put("./",cp)})}return r}).catch(()=>caches.match("index.html").then(h=>h||caches.match("./"))));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r})))});
