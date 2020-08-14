import leagueIcon from '../../../components/image';

const nationLeague = [
    {
        id: 2072,
        name: Object.keys(leagueIcon)[0],
        icon: Object.values(leagueIcon)[0],
        league: [
            {
                id: 2021,
                name: 'Premiere League',
                status: 'England, TIER_ONE'
            },
            {
                id: 2016,
                name: 'Championship',
                status: 'England, TIER_ONE'
            }
        ]
    },
    {
        id: 2081,
        name: Object.keys(leagueIcon)[1],
        icon: Object.values(leagueIcon)[1],
        league: [
            {
                id: 2015,
                name: 'Ligue 1',
                status: 'France, TIER_ONE'
            }
        ]
    },
    {
        id: 2088,
        name: Object.keys(leagueIcon)[2],
        icon: Object.values(leagueIcon)[2],
        league: [
            {
                id: 2002,
                name: 'BundesLiga',
                status: 'Germany, TIER_ONE'
            }
        ]
    },
    {
        id: 2114,
        name: Object.keys(leagueIcon)[3],
        icon: Object.values(leagueIcon)[3],
        league: [
            {
                id: 2019,
                name: 'Serie A',
                status: 'Italy, TIER_ONE'
            }
        ]
    },
    {
        id: 2224,
        name: Object.keys(leagueIcon)[4],
        icon: Object.values(leagueIcon)[4],
        league: [
            {
                id: 2014,
                name: 'Primera Division',
                status: 'Spain, TIER_ONE'
            }
        ]
    }
];

export default {
    nationLeague
}