import competitionDbs from './fetch/competition';
import store from './store/league';

const fetchCompetition = () => {
    return competitionDbs.fetchCompetition().then(res => {
        return res;
    })
}

const addCompetition = () => {
    competitionDbs.fetchCompetition().then(res => {
        const actionIcon = document.querySelectorAll('.action .icon');
        const savedLeague = [];

        if (res) {
            res.forEach(league => {
                savedLeague.push(league.id);
            });
        }

        actionIcon.forEach(el => {
            const id = parseInt(el.dataset.id);
            const nationId = el.dataset.nation;
            // IF SAVED
            if (savedLeague.includes(id)) {
                el.dataset.status = 'true';
                el.classList.add('active');
                el.addEventListener('click', () => {
                    el.classList.remove('icon');
                    el.classList.add('small__loading');
                    const status = el.dataset.status;
                    if (status === 'true') {
                        competitionDbs.removeCompetition(id, el);
                    } else {
                        setCompetition(id, nationId, el);
                    }
                });
            }
            // IF NOT SAVED
            else {
                el.addEventListener('click', () => {
                    el.classList.remove('icon');
                    el.classList.add('small__loading');
                    const status = el.dataset.status;
                    if (status === 'true') {
                        competitionDbs.removeCompetition(id, el);
                    } else {
                        setCompetition(id, nationId, el);
                    }
                })
            }
        })
    })
}

const setCompetition = (id, nationId, el) => {
    const nationLeague = store.nationLeague;
    const nation = nationLeague.filter(nation => nation.id == nationId)[0];
    const league = nation.league.filter(league => league.id === id)[0];

    const data = {
        id: id,
        name: league.name,
        status: league.status
    }

    competitionDbs.addCompetition(data, el);
}

export default {
    fetchCompetition,
    addCompetition
}