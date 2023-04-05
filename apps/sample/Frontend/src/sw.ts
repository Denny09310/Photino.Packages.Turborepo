import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

const componentName = 'Service Worker';

// Enable debug mode during development
const DEBUG_MODE = location.hostname.endsWith('.app.local') || location.hostname === 'localhost';
const DAYS_UNIT = 24 * 60;

/**
 * The current version of the service worker.
 */
const SERVICE_WORKER_VERSION = '1.0.0';

if (DEBUG_MODE) {
    console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}

// ------------------------------------------------------------------------------------------
// Precaching configuration
// ------------------------------------------------------------------------------------------
cleanupOutdatedCaches();

// Precaching
// Make sure that all the assets passed in the array below are fetched and cached
// The empty array below is replaced at build time with the full list of assets to cache
// This is done by workbox-build-inject.js for the production build
const assetsToCache = self.__WB_MANIFEST;
// To customize the assets afterwards:
//assetsToCache = [...assetsToCache, ???];

if (DEBUG_MODE) {
    console.trace(`${componentName}:: Assets that will be cached: `, assetsToCache);
}

precacheAndRoute(assetsToCache);

registerRoute(
    /\/api\/.*\/*.json/,
    new NetworkOnly({
        plugins: [
            new BackgroundSyncPlugin('apiRequestsQueue', {
                maxRetentionTime: DAYS_UNIT,
            }),
        ],
    }),
    'POST'
);

// ------------------------------------------------------------------------------------------
// Messages
// ------------------------------------------------------------------------------------------
self.addEventListener('message', (event: { data: any; type: any; ports: any }) => {
    // TODO define/use correct data type
    if (event && event.data && event.data.type) {
        // return the version of this service worker
        if ('GET_VERSION' === event.data.type) {
            if (DEBUG_MODE) {
                console.debug(
                    `${componentName}:: Returning the service worker version: ${SERVICE_WORKER_VERSION}`
                );
            }
            event.ports[0].postMessage(SERVICE_WORKER_VERSION);
        }

        // When this message is received, we can skip waiting and become active
        // (i.e., this version of the service worker becomes active)
        // Reference about why we wait: https://stackoverflow.com/questions/51715127/what-are-the-downsides-to-using-skipwaiting-and-clientsclaim-with-workbox
        if ('SKIP_WAITING' === event.data.type) {
            if (DEBUG_MODE) {
                console.debug(`${componentName}:: Skipping waiting...`);
            }
            self.skipWaiting();
        }

        // When this message is received, we can take control of the clients with this version
        // of the service worker
        if ('CLIENTS_CLAIM' === event.data.type) {
            if (DEBUG_MODE) {
                console.debug(`${componentName}:: Claiming clients and cleaning old caches`);
            }
            self.clients.claim();
        }
    }
});

