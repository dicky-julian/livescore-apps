import './public/css/main.css';
import './public/css/responsive.css';
import './public/css/materialize.min.css';
import './public/js/materialize.min.js';
import main from './public/js/main.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
            navigator.serviceWorker.ready.then(() => {
                registration.pushManager.subscribe({ userVisibleOnly: true });
            });
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

main();