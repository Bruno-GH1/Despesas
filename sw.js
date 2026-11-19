/* Keeps the app's own files so it opens instantly and works without a connection.
   Pills, history and photos are not touched here: they live in the phone's own storage. */
var CACHE = "despesas-v6";
var SHELL = ["./", "index.html", "logo.png", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

/* only this app's old caches are removed, never another app's on the same github.io address */
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k.indexOf("despesas-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

/* network first, so a new version uploaded to GitHub arrives straight away; the saved copy is the fallback */
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var u = new URL(req.url);
  /* Firebase libraries: keep a copy so the app still starts without internet */
  if (u.origin === "https://www.gstatic.com" && u.pathname.indexOf("/firebasejs/") === 0) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res; });
    }));
    return;
  }
  if (u.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(function (res) {
        if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match("index.html"); });
      })
  );
});
