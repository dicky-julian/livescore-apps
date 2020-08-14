import config from '../../config';

const fetchStanding = (id) => {
    const url = `${config.MAIN_URL}/competitions/${id}/standings`;
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

const fetchCompetition = (id) => {
    const url = `${config.MAIN_URL}/competitions/${id}`;
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
    fetchStanding,
    fetchCompetition
}