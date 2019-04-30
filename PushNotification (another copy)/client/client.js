const publicVapidKey = 'BEKtxYgmJXigjRBFGFgvqvC4KY9zDeQAWWF5uhsLNne4ybMmRRlOphZ5ODyl2bZxJQ-wKNwN5PrZ2xWpIrtupus';
if ('serviceWorker' in navigator) {
    //send().catch(err => { console.error(err) });
}

async function send() {
    console.log('Registering Worker ...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: 'http://localhost:3000/index2.html'
    });

    console.log('Service Worker registered ...');
    console.log('Registering Push  ...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered ...');
    console.log('Sending Push Notification ...');

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log('Push Sent ....');

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}