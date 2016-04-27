'use strict';

/**
 * @public
 * @constructor
 */
function AntraegeController(opts) {
    const antraegeRepository = opts.antraegeRepository;

    this.getListOrCount = (req, res, next) => {
        const partnerId = parseInt(req.query.partnerId, 10);

        if (isNaN(partnerId)) {
            res.status(400).send('bad request, partnerId should be an integer');
            return next();
        }

        const mode = req.query.mode || 'list';
        const items = antraegeRepository.filter(p => p.partnerId === partnerId);

        if (mode === 'list') {
            return res.status(200).json(items);
        }
        else {
            return res.status(200).json({
                count: items.length
            });
        }
    };
}

module.exports = AntraegeController;
