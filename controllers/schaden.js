'use strict';

/**
 * @public
 * @constructor
 */
function SchadenController(opts) {
    const vertraegeRepository = opts.vertraegeRepository;
    const partnerRepository = opts.partnerRepository;

    this.getVorbelegung = (req, res, next) => {
        const partnerId = parseInt(req.query.partnerId, 10);
        const vsnr = parseInt(req.query.vsnr, 10);
        const sparte = req.params.sparte || '';

        if (isNaN(partnerId)) {
            res.status(400).send('bad request, partnerId should be an integer');
            return next();
        }

        if (isNaN(vsnr)) {
            res.status(400).send('bad request, vsnr should be an integer');
            return next();
        }

        if (sparte.toLowerCase() !== 'kraftfahrt') {
            res.status(400).send('bad request, sparte is invalid');
            return next();
        }

        const partner = partnerRepository.find(p => p.partnerId === partnerId);

        if (!partner) {
            res.status(404).send('partner not found');
            return next();
        }

        const vertrag = vertraegeRepository.find(p => p.vsnr === vsnr);

        if (!vertrag) {
            res.status(404).send('vertrag not found');
            return next();
        }

        const result = {
            vsnr: vertrag.vsnr,
            anschrift: partner.anschrift
        };

        res.status(200).json(result);
    };

    this.create = (req, res) => {
        res.status(201).json(req.body);
    };
}

module.exports = SchadenController;
