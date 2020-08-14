import element from '../config/element';
import date from '../config/date';
import match from './fetch/match';
import dbMatch from '../db/match';

export const  store = {
    today: [],
    tomorrow: []
};

const matchPage = () => {
    // Fetch Match Today
    if (!store.today.length) {
        match.matchToday().then(res => {
            if (!res) {
                element.addAlert('.match__today');
                return '';
            }
            const datas = res.matches;
            store.today.push(datas);
            renderMatch(datas, '.match__today');
        });
    } else {
        const datas = store.today[0];
        renderMatch(datas, '.match__today');
    }

    // Fetch Match Tomorrow
    if (!store.tomorrow.length) {
        match.matchTomorrow().then(res => {
            if (!res) {
                element.addAlert('.match__tomorrow');
                return '';
            }
            const datas = res.matches;
            store.tomorrow.push(datas);
            renderMatch(datas, '.match__tomorrow');
        });
    } else {
        const datas = store.tomorrow[0];
        renderMatch(datas, '.match__tomorrow');
    }

    // Fetch Pinned Match
    dbMatch.fetchMatch().then(res => {
        if (!res.length) {
            element.checkElement('.match__pinned').then(wrapper => {
                wrapper.innerHTML += `
                <div class='empty__field'>
                    <div class='bt bt__primary' onclick='window.scroll(0,0)'>No Pinned Match, Lets pin now!</div>
                </div>`
            })
            return '';
        }
        renderPinnedMatch(res, '.match__pinned', 3);
    })
}

// Render Match
const renderMatch = (datas, el) => {
    if (!datas) return '';
    element.checkElement(`${el} .loading`).then(wrapper => {
        wrapper.remove();
    })

    element.checkElement(el).then(wrapper => {
        datas.map(data =>
            wrapper.innerHTML += `
            <div class="match">
                <div class="time">
                    <h6>${date.getTime(data.utcDate)}</h6>
                </div>
                <div class="team">
                    <div>
                        <h6>${data.homeTeam.name}</h6>
                    </div>
                    <div>
                        <h6>${data.awayTeam.name}</h6>
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

// Render Pinned Match
const renderPinnedMatch = (datas, el, limit) => {
    if (limit > datas.length) limit = datas.length;

    element.checkElement(el).then(wrapper => {
        for (let i = 0; i < limit; i++) {
            wrapper.innerHTML += `
            <div>
                <div class="match__info">
                    <div>
                        <h6 class="m__0 tx__bold">${datas[i].competition}</h6>
                    </div>
                    <div class="match__status scheduled">SCHEDULED</div>
                </div>
                <div class="time tx__medium">${date.getFullDate(datas[i].utcDate)}</div>
                <div class="team">
                    <div>
                        <h6>${datas[i].homeTeam}</h6>
                        <h6>-</h6>
                    </div>
                    <div>
                        <h6>${datas[i].awayTeam}</h6>
                        <h6>-</h6>
                    </div>
                </div>
            </div>`
        }
    })
}

export default matchPage;