importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBaXU7sZBu9H4lgbN2XzczOSdr0Cp1P-_M",
  authDomain: "depoq-antrean.firebaseapp.com",
  projectId: "depoq-antrean",
  storageBucket: "depoq-antrean.firebasestorage.app",
  messagingSenderId: "328905760188",
  appId: "1:328905760188:web:05217e80f4919d9b7e9fb9"
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage(p => {
  const d = p.data || {};
  return self.registration.showNotification(d.title || "DepoQ", {
    body: d.body || "",
    tag: "antrean",
    renotify: true,
    requireInteraction: true,
    vibrate: [800,200,800,200,800,200,800,200,800]
  });
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:"window", includeUncontrolled:true}).then(list => {
    for (const c of list) if ("focus" in c) return c.focus();
    return clients.openWindow(self.registration.scope);
  }));
});
