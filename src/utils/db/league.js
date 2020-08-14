import leagueDbs from './fetch/league';
import store from './store/league';

const fetchNationLeague = () => {
    return leagueDbs.fetchNationLeague().then(res => {
        if (res.length) return res;
        store.nationLeague.forEach(data => {
            leagueDbs.addNationLeague(data)
        })
    }).then((res) => {
        if (!res) {
            res = leagueDbs.fetchNationLeague().then(res => { 
                return res;
            });
        }
        return res;
    })
}

export default {
    fetchNationLeague,
}