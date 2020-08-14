import dbs from './dbs';

const fetchCompetition = () => {
    const result = dbs.then(db => {
        const tx = db.transaction('competition', 'readonly');
        const store = tx.objectStore('competition');
        return store.getAll();
    }).then(items => {
        return items;
    }).catch(() => { return false });

    return result;
}

const addCompetition = (data, el) => {
    dbs.then(db => {
        const tx = db.transaction('competition', 'readwrite');
        const store = tx.objectStore('competition');
        store.put(data);
        return tx.complete;
    }).then(() => {
        el.dataset.status = 'true';
        el.classList.remove('small__loading');
        el.classList.add('icon');
        el.classList.add('active');
    })
}

const removeCompetition = (id, el) => {
    dbs.then(db => {
        const tx = db.transaction('competition', 'readwrite');
        const store = tx.objectStore('competition');
        store.delete(id);
        return tx.complete;
    }).then(() => {
        el.dataset.status = 'false';
        el.classList.add('icon');
        el.classList.remove('small__loading');
        el.classList.remove('active');
    })
}

export default {
    fetchCompetition,
    addCompetition,
    removeCompetition
}