import element from '../config/element';
import dbLeague from '../db/league';
import dbCompetition from '../db/competition';
import competition from './fetch/competition';
import modal from '../../components/modal';

const leaguePage = () => {
    fetchNationLeague();
    fetchPinnedLeague();
}

// Fetch Areas (Nation)
const fetchNationLeague = () => {
    dbLeague.fetchNationLeague().then(res => {
        renderLeague(res);
    });
}

// Fetch Pinned League
const fetchPinnedLeague = () => {
    dbCompetition.fetchCompetition().then(res => {
        if (!res.length) {
            element.checkElement('.match__pinned').then(wrapper => {
                wrapper.innerHTML += `
                <div class='empty__field'>
                    <div class='bt bt__primary' onclick='window.scroll(0,0)'>No Pinned League, Lets pin now!</div>
                </div>`
            })
            return '';
        }
        renderPinnedLeague(res, '.match__pinned', 6);
    })
}

// Render Areas (Nation)
const renderLeague = (nationLeague) => {
    element.checkElement(`.league__list`).then(wrapper => {
        nationLeague.map(nation => {
            wrapper.innerHTML += `
            <div class='league' data-name='${nation.name}'>
                <div>
                    <img src="${nation.icon}">
                    <h6 class="tx__cap">${nation.name}</h6>
                </div>
                <div class="icon arrow__down bg__setup"></div>
            </div>
            <div class="league__detail__list league__${nation.name}"></div>`
        })
        wrapper.querySelector('.loading').remove();
    });

    renderDetail(nationLeague);
}

// Render League by Area
const renderDetail = (nationLeague) => {
    element.checkMultiElement('.league').then(wrapper => {
        for (let i = 0; i < wrapper.length; i++) {
            // Add event when user load league's areas (nation)
            wrapper[i].addEventListener('click', () => {
                const leagues = nationLeague[i].league;
                const toogle = wrapper[i].querySelector('.icon');
                toogle.classList.remove('arrow__down');
                toogle.classList.add('small__loading');
                element.checkElement(`.league__${nationLeague[i].name}`).then(wrapper => {
                    if (wrapper.classList.contains('active')) {
                        wrapper.classList.remove('active');
                    } else {
                        if (!wrapper.classList.contains('available')) {
                            leagues.map(league => {
                                wrapper.innerHTML += `
                                <div class='detail__list'>
                                    <h6 class='c__pointer' data-id='${league.id}'>${league.name}</h6>
                                    <div class='action'>
                                        <div data-id='${league.id}' data-nation='${nationLeague[i].id}' data-status='false' class='icon bg__setup'></div>
                                    </div>
                                </div>`
                            })
                            wrapper.classList.add('available');
                        }
                        wrapper.classList.add('active');
                    }
                    toogle.classList.remove('small__loading');
                    toogle.classList.add('arrow__down');
                }).then(() => {
                    document.querySelectorAll('.detail__list h6').forEach(el => {
                        // Add event when user load league and show standing's modal
                        el.addEventListener('click', () => {
                            const id = el.dataset.id;
                            modal.showModal('league');
                            competition.fetchStanding(id).then(res => {
                                modal.fillModal('league');
                                element.checkElement('.modal-content tbody').then(wrapper => {
                                    if (!res) {
                                        wrapper.innerHTML = `<div class='empty__field'><div class='bt bt__primary'>Need Internet to get newest data.</div></div>`;
                                        return '';
                                    }
                                    const table = res.standings[0].table;
                                    let tableField = '';
                                    table.map(team => {
                                        tableField += `<tr>
                                            <td><div>${team.position}</div></td>
                                            <td>${team.team.name}</td>
                                            <td>${team.playedGames}</td>
                                            <td>${team.won}</td>
                                            <td>${team.draw}</td>
                                            <td>${team.lost}</td>
                                            <td>${team.goalsFor}:${team.goalsAgainst}</td>
                                        </tr>`
                                    });
                                    wrapper.innerHTML = tableField;
                                })
                            })
                        })
                    })
                }).then(() => {
                    dbCompetition.addCompetition();
                })
            })
        }
    })
}

const renderPinnedLeague = (datas, el, limit) => {
    element.checkElement(el).then(wrapper => {
        if (limit > datas.length) limit = datas.length;
        for (let i = 0; i < limit; i++) {
            wrapper.innerHTML += `
                <div>
                    <div class="match__info">
                        <div>
                            <h6 class="m__0 tx__bold">${datas[i].name}</h6>
                            <h6>${datas[i].status}</h6>
                        </div>
                        <div class="action">
                            <div data-id='${datas[i].id}' class="icon bg__setup active" data-status="true"></div>
                        </div>
                    </div>
                </div>`
        }
    }).then(() => {
        dbCompetition.addCompetition();
    })
}

export default leaguePage;