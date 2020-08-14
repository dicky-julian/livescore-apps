import config from '../../config';
import date from '../../config/date';

const matchById = (id) => {
    const url = `${config.MAIN_URL}/matches/${id}`;
    const result = fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': config.API_AUTH
        }
    }).then(res => {
        const data = res.json();
        if (data.errorCode) return false;
        return data;
    }).catch(() => { return false })

    return result;
}

const matchToday = () => {
    const url = `${config.MAIN_URL}/matches?dateTo=${date.today}&dateFrom=${date.today}`;
    const result = fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': config.API_AUTH
        }
    }).then(res => {
        const data = res.json();
        if (data.errorCode) return false;
        return data;
    }).catch(() => { return false })

    return result;
}

const matchTomorrow = () => {
    const url = `${config.MAIN_URL}/matches?dateTo=${date.tomorrow}&dateFrom=${date.tomorrow}`;
    const result = fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': config.API_AUTH
        }
    }).then(res => {
        const data = res.json();
        if (data.errorCode) return false;
        return data;
    }).catch(() => { return false })

    return result;
}

export default {
    matchById,
    matchToday,
    matchTomorrow
}