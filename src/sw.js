importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
import favicon from './public/img/icon-192.png';

if (workbox) {
    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    workbox.routing.registerRoute(
        ({ url }) => url.origin,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'URL'
        })
    );
} else {
    console.log('Workbox gagal dimuat')
}

self.addEventListener('push', (event) => {
    let body;
    if (event.data) body = event.data.text();
    else {
        body = 'Push message no payload'
    }

    const options = {
        body: body,
        icon: favicon,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})