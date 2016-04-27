'use strict';

/**
 * @public
 * @constructor
 */
function AntraegeRepository(server) {
    let currentId = 0;

    function generateData() {
        const antragId = currentId++;
        return {
            antragId: antragId,
            partnerId: 4711 + (currentId % 15),
            sparte: 'Kraftfahrt',
            beitragZent: Math.floor(Math.random() * 40000 + 2000)
        }
    }

    let result = [];

    for (let i = 0; i < 44; i++) {
        result.push(generateData());
    }

    return result;
}

module.exports = AntraegeRepository;
