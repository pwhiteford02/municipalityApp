const VERSION = 'v1.00.8';

const cacheResources = async () => {
    const cacheFilesFirst = [
        '/',
        '/public/views/pages/index.ejs',
        '/public/views/pages/help.ejs',
        '/public/views/pages/events.ejs',
        '/public/views/pages/login.ejs',
        '/public/views/pages/maps.ejs',
        '/public/views/templates/footer.ejs',
        '/public/views/templates/header.ejs',
        '/public/views/templates/loginButton.ejs',
        '/public/views/templates/map.ejs',
        '/public/views/templates/menuBar.ejs',
        '/public/css/foundation.css',
        '/public/css/main.css',
        '/public/images/menuImage.png',
        '/public/javascripts/main.js'

    ];
    const cache = await caches.open(VERSION);
    return cache.addAll(cacheFilesFirst);
};

self.addEventListener('install', async (event) => {
    event.waitUntil(cacheResources());
    await self.skipWaiting();
});

const cachedResource = async (request) => {
    const cache = await caches.open(VERSION);
    return await cache.match(request);
};

self.addEventListener('activate', async (event) => {
    console.log(`SW activated:  ${event}`);
    await self.clients.claim();
});

self.addEventListener('fetch', async (event) => {
    console.log(`Fetch event: ${event.request.url}`);
    if (event.request.url.endsWith(`overrides.css`)) {
        await event.respondWith(fetch('/public/css/overrides2.css'));
    } else {
        await event.respondWith(cachedResource(event.request));
    }
});

self.addEventListener('push', async (event) => {

});

self.addEventListener('sync', async (event) => {

});