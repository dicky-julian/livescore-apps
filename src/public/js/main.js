import navbar from '../../components/navbar';
import favicon from '../img/icon-192.png';

const changeFavicon = () => {
    let link = document.createElement('link')
    link.rel = 'shortcut icon';
    link.href = favicon;
    document.head.appendChild(link);
}

const main = () => {
    navbar();
    changeFavicon();
}

export default main;