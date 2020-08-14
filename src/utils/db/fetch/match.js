import dbs from './dbs';

// get Match from Store
const fetchMatch = () => {
    const result = dbs.then(db => {
        const tx = db.transaction('match', 'readonly');
        const store = tx.objectStore('match');
        return store.getAll();
    }).then(items => {
        return items;
    }).catch(() => { return false });

    return result;
}

// add Match to Store
const addMatch = (data, el) => {
    dbs.then(db => {
        const tx = db.transaction('match', 'readwrite');
        const store = tx.objectStore('match');
        const item = data;
        store.put(item);
        return tx.complete;
    }).then(() => {
        M.toast({html: 'Succesfully added item to pin', classes: 'rounded'})
        el.dataset.status = 'true';
        el.classList.remove('small__loading');
        el.classList.add('icon');
        el.classList.add('active');
    })
}

// delete Match from store
const removeMatch = (id, el) => {
    dbs.then(db => {
        const tx = db.transaction('match', 'readwrite');
        const store = tx.objectStore('match');
        store.delete(id);
        return tx.complete;
    }).then(() => {
        M.toast({html: 'Succesfully remove item from pin', classes: 'rounded'})
        el.dataset.status = 'false';
        el.classList.add('icon');
        el.classList.remove('small__loading');
        el.classList.remove('active');
    })
}

export default {
    fetchMatch,
    addMatch,
    removeMatch
}