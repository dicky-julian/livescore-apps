import idb from 'idb';

const dbs = idb.open('live-score', 1, (upgradeDB) => {
    if (!upgradeDB.objectStoreNames.contains('competition')) {
        upgradeDB.createObjectStore('competition', { keyPath: 'id'});
    }

    if (!upgradeDB.objectStoreNames.contains('league')) {
        upgradeDB.createObjectStore('league', { keyPath: 'id'});
    }

    if (!upgradeDB.objectStoreNames.contains('match')) {
        upgradeDB.createObjectStore('match', { keyPath: 'id' });
    }
})

export default dbs;