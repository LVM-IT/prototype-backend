'use strict';

/**
 * @public
 * @constructor
 */
function AngeboteController(opts) {
    const angeboteRepository = opts.angeboteRepository;
    const partnerRepository = opts.partnerRepository;
    const server = opts.server;

    this.getListOrCount = (req, res, next) => {
        const partnerId = parseInt(req.query.partnerId, 10);

        if (isNaN(partnerId)) {
            res.status(400).send('bad request, partnerId should be an integer');
            return next();
        }

        const mode = req.query.mode || 'list';
        const items = angeboteRepository.filter(p => p.partnerId === partnerId)
            .map(p => {
                return {
                    angebotId: p.angebotId,
                    partnerId: p.partnerId,
                    sparte: p.sparte,
                    rolle: p.rolle,
                    agentur: p.agentur,
                    versichertist: p.versichertist,
                    schaeden: p.schaeden,
                    ablauf: p.ablauf,
                    zahlungsweise: p.zahlungsweise,
                    beitragZent: p.beitragZent,
                    angebotURI: p.angebotURI
                };
            });

        if (mode === 'list') {
            return res.status(200).json(items);
        }
        else {
            return res.status(200).json({
                count: items.length
            });
        }
    };

    this.get = (req, res, next) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        let result = angeboteRepository.find(p => p.angebotId === id);

        if (!result) {
            res.status(404).send('item not found');
            return next();
        }

        res.status(200).json(result);
    };

    this.getVorbelegung = (req, res, next) => {
        const id = parseInt(req.query.partnerId, 10);
        const sparte = req.params.sparte || '';

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        if (sparte.toLowerCase() !== 'kraftfahrt') {
            res.status(400).send('bad request, sparte is invalid');
            return next();
        }

        let partner = partnerRepository.find(p => p.partnerId === id);

        if (!partner) {
            res.status(404).send('partner not found');
            return next();
        }

        const result = {
            geburtsdatum: partner.geburtsdatum,
            anschrift: partner.anschrift,
            zahlungsweise: [
                {
                    id: 1,
                    name: 'monatlich'
                },
                {
                    id: 2,
                    name: 'jährlich'
                }
            ]
        };

        res.status(200).json(result);
    };

    this.create = (req, res, next) => {
        const angebot = req.body;

        if (!angebot) {
            res.status(400).send('Body should not be empty');
            return next();
        }

        if (!angebot.partnerId) {
            res.status(400).send('partnerId is not set');
            return next();
        }

        addAngebotId(angebot);
        angeboteRepository.push(angebot);

        res.status(201).json(angebot);
    };

    this.copy = (req, res, next) => {
        const angebotId = parseInt(req.params.id, 10);

        if (isNaN(angebotId)) {
            res.status(400).send('bad request, angebotId should be an integer');
            return next();
        }

        const angebot = angeboteRepository.find(p => p.angebotId === angebotId);

        if (!angebot) {
            res.status(404).send('item not found');
            return next();
        }

        const copiedAngebot = JSON.parse(JSON.stringify(angebot));

        addAngebotId(copiedAngebot);
        angeboteRepository.push(copiedAngebot);

        res.status(201).json(copiedAngebot);
    };

    function addAngebotId(angebot) {
        angebot.angebotId = angeboteRepository.length + 1;
        angebot.angebotURI = `${server}/angebot/${angebot.angebotId}`;
    }
    
    this.berechnen = (req, res) => {
        const sparte = req.params.sparte || '';

        if (sparte.toLowerCase() !== 'kraftfahrt') {
            res.status(400).send('bad request, sparte is invalid');
            return next();
        }

        const result = [];
        const errorCount = Math.floor(Math.random() * 6) + 1;
        const randomPropertyNames = [];

        for (let i = 0; i < errorCount; i++) {
            const randomPropertyName = getRandomPropertyName(req.body);

            if (randomPropertyNames.indexOf(randomPropertyName) > -1) {
                continue;
            }

            randomPropertyNames.push(randomPropertyName);
            result.push(createError(randomPropertyName));
        }

        res.status(400).json(result);
    };

    function createError(bezugsFeld) {
        return {
            fehlerId: Math.floor(Math.random() * 100 + 1),
            fehlerKategorie: Math.floor(Math.random() * 3),
            fehlerText: 'Bitte denken Sie sich Ihre eigene Fehlermeldung aus.',
            bezugsFeld: bezugsFeld
        };
    }

    function getRandomPropertyName(object) {
        const keys = Object.keys(object);
        let key;

        do {
            key = keys[Math.floor(Math.random() * keys.length)]
        }
        while (key.toLowerCase().indexOf('id') > -1 || key.toLowerCase().indexOf('uri') > -1);

        const prop = object[key];

        let result = key;

        if (typeof prop === 'object') {
            result += '.' + getRandomPropertyName(prop);
        }

        return result;
    }
}

module.exports = AngeboteController;
