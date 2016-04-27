'use strict';

/**
 * @public
 * @constructor
 */
function PartnerController(opts) {
    const partnerRepository = opts.partnerRepository;
    const haushaltRepository = opts.haushaltRepository;
    const kontakthistorieRepository = opts.kontakthistorieRepository;

    this.list = (req, res) => {
        let result = partnerRepository;

        if (req.query.q) {
            let query = req.query.q;
            query = query.toLowerCase();

            result = result.filter(partner => {
                const name = partner.vorname.toLowerCase() + ' ' + partner.name.toLowerCase();

                return name.indexOf(query) > -1
                    || partner.partnerId.toString().indexOf(query) > -1;
            });
        }

        res.status(200).json(result);
    };

    this.get = (req, res, next) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        let result = partnerRepository.find(p => p.partnerId === id);

        if (!result) {
            res.status(404).send('item not found');
            return next();
        }

        res.status(200).json(result);
    };

    this.getHaushalt = (req, res) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        let result = haushaltRepository.filter(p => p.partnerId === id);

        res.status(200).json(result);
    };
    
    this.getKontakte = (req, res) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        let result = kontakthistorieRepository.filter(p => p.partnerId === id);

        res.status(200).json(result);
    };
}

module.exports = PartnerController;
