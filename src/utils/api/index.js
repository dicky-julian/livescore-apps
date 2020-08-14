import match from './match';
import league from './league';
import favorite from './favorite';

const fetchData = (page) => {
    switch (page) {
        case "match":
            match();
            break;
        case "league":
            league();
            break;
        case "favorite":
            favorite();
            break;
        default:
            break;
    }
}

export default fetchData;