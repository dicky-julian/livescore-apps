import urlBase64ToUint8Array from './utils/config/Uint8Array';

const requestPermission = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === 'denied') {
                console.log('Fitur notifikasi tidak diijinkan');
                return;
            } else if (result === 'default') {
                console.error('Pengguna menutup kotak dialog permintaan ijin');
                return;
            }

            console.log('Fitur notifikasi diijinkan');
            navigator.serviceWorker.ready.then(() => {
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BF3C5MMeazn35QrCvu8zGtUTlCeEviB7ulql2NkQeVHJSxGuf5pBhmk6JgQ-p_Bb7yxAJZVbCy31Rk5nN_oObdQ")
                        }).then(subscribe => {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(e => {
                            console.error('Tidak dapat melakukan subscribe ', e.message);
                        });
                    })
                }
            })
        })
    } else {
        console.error("Your browser does not support Push Notification.");
    }
}

export default requestPermission;