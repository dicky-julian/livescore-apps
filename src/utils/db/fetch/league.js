import dbs from './dbs';

// Nation League
const fetchNationLeague = () => {
    const result = dbs.then(db => {
        const tx = db.transaction('league', 'readonly');
        const store = tx.objectStore('league');
        return store.getAll();
    }).then(items => {
        return items;
    }).catch(() => { return false });

    return result;
}

const addNationLeague = (data) => {
    dbs.then(db => {
        const tx = db.transaction('league', 'readwrite');
        const store = tx.objectStore('league');
        store.put(data);
        return tx.complete;
    });
}

export default {
    fetchNationLeague,
    addNationLeague
}