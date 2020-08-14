import matchDbs from './fetch/match';
import { store } from '../api/match';

const fetchMatch = () => {
    const result = matchDbs.fetchMatch().then(res => {
        return res;
    });

    return result;
}

const addMatch = () => {
    matchDbs.fetchMatch().then(res => {
        const actionIcon = document.querySelectorAll('.action .icon');
        const savedMatch = [];
        if (res) {
            res.forEach(match => {
                savedMatch.push(match.id);
            });
        }

        actionIcon.forEach(el => {
            const id = el.dataset.id;

            // IF SAVED
            if (savedMatch.includes(id)) {
                el.dataset.status = 'true';
                el.classList.add('active');
                el.addEventListener('click', (() => {
                    el.classList.remove('icon');
                    el.classList.add('small__loading');
                    const status = el.dataset.status;
                    if (status === 'true') {
                        matchDbs.removeMatch(id, el);
                    } else {
                        setMatch(id, el);
                    }
                }));
            } 
            // IF NOT SAVED
            else {
                el.addEventListener('click', (() => {
                    el.classList.remove('icon');
                    el.classList.add('small__loading');
                    const status = el.dataset.status;
                    if (status === 'true') {
                        matchDbs.removeMatch(id, el);
                    } else {
                        setMatch(id, el);
                    }
                }))
            }
        })
    });
}

// set API data to Store
const setMatch = (id, el) => {
    const matchs = store.today[0].concat(store.tomorrow[0]);
    const match = matchs.filter(data => data.id == id);
    if (match.length) {
        const data = {
            id: id,
            utcDate: match[0].utcDate,
            homeTeam: match[0].homeTeam.name,
            awayTeam: match[0].awayTeam.name,
            competition: match[0].competition.name
        }
        matchDbs.addMatch(data, el);
    }
}

export default {
    fetchMatch,
    addMatch
}