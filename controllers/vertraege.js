'use strict';

/**
 * @public
 * @constructor
 */
function VertraegeController(opts) {
    const vertraegeRepository = opts.vertraegeRepository;
    const partnerRepository = opts.partnerRepository;

    this.getListOrCount = (req, res, next) => {
        const partnerId = parseInt(req.query.partnerId, 10);

        if (isNaN(partnerId)) {
            res.status(400).send('bad request, partnerId should be an integer');
            return next();
        }

        const mode = req.query.mode || 'list';
        const items = vertraegeRepository.filter(p => p.partnerId === partnerId)
            .map(p => {
                return {
                    sparte: p.sparte,
                    beitragZent: p.beitragZent,
                    vertragURI: p.vertragURI,
                    vsnr: p.vsnr,
                    partnerId: p.partnerId
                }
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

        let result = vertraegeRepository.find(p => p.vsnr === id);

        if (!result) {
            res.status(404).send('item not found');
            return next();
        }

        res.status(200).json(result);
    };

    this.getBriefvorlagen = (req, res) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        const vertrag = vertraegeRepository.find(p => p.vsnr === id);

        if (!vertrag) {
            res.status(404).send('vertrag not found');
            return next();
        }

        const result = {
            kategorien: [
                {
                    id: 1,
                    name: 'Risiko Unfallversicherung',
                    vorlagen: [
                        {
                            id: 10,
                            name: 'Kündigung'
                        },
                        {
                            id: 11,
                            name: 'Allgemeine Mitteilung'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Freitext',
                    vorlagen: [
                        {
                            id: 20,
                            name: 'VT12 Freier Text'
                        },
                        {
                            id: 21,
                            name: 'VT13 Freier Text mit Rückantwort'
                        }
                    ]
                }
            ]
        };

        res.status(200).json(result);
    };

    this.getBriefempfaenger = (req, res) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        const vertrag = vertraegeRepository.find(p => p.vsnr === id);

        if (!vertrag) {
            res.status(404).send('vertrag not found');
            return next();
        }

        const partner = partnerRepository.find(p => p.partnerId === vertrag.partnerId);

        if (!partner) {
            res.status(404).send('partner not found');
            return next();
        }

        const result = [
            {
                empfaengerName: partner.vorname + ' ' + partner.name,
                rolle: 'Versicherungsnehmer',
                rolleId: 1,
                original: true
            },
            {
                empfaengerName: 'Sachbearbeiter Stephan Hillmann',
                rolle: 'Sachbearbeiter',
                rolleId: 2
            }
        ];

        res.status(200).json(result);
    };
}

module.exports = VertraegeController;
