import element from '../config/element';
import date from '../config/date';
import dbMatch from '../db/match';
import dbCompetition from '../db/competition';

const favoritePage = () => {
    dbMatch.fetchMatch().then(res => {
        if (!res.length) {
            element.checkElement('.pinned__match').then(wrapper => {
                wrapper.innerHTML = `
                <div class='empty__field'>
                    <div class='bt bt__primary' onclick='window.scroll(0,0)'>No Pinned League, Lets pin now!</div>
                </div>`
            })
            return '';
        }
        renderMatch(res, '.pinned__match');
    });

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
        renderLeague(res, '.match__pinned', 6);
    })
}

const renderMatch = (datas, el) => {
    element.checkElement(`${el} .loading`).then(wrapper => {
        wrapper.remove();
    });

    element.checkElement(el).then(wrapper => {
        datas.map(data =>
            wrapper.innerHTML += `
            <div class="match">
                <div class="time">
                    <h6>${date.getTime(data.utcDate)}</h6>
                </div>
                <div class="team">
                    <div>
                        <h6>${data.homeTeam}</h6>
                    </div>
                    <div>
                        <h6>${data.awayTeam}</h6>
                    </div>
                </div>
                <div class="action">
                    <div data-id="${data.id}" data-status="false" class="icon bg__setup"></div>
                </div>
            </div>`
        )
    }).then(() => {
        dbMatch.addMatch();
    })
}

const renderLeague = (datas, el, limit) => {
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

export default favoritePage;