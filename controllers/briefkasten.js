'use strict';

/**
 * @public
 * @constructor
 */
function BriefkastenController(opts) {
    const briefkastenRepository = opts.briefkastenRepository;
    const vertraegeRepository = opts.vertraegeRepository;
    const server = opts.server;

    this.list = (req, res) => {
        const userId = req.params.id || '';

        if (!userId) {
            res.status(400).send('bad request, id should be an integer');
            return next();
        }

        const items = briefkastenRepository.filter(p => p.userId === userId);
        items.filter(p => p.bezug)
            .forEach(p => {
                const vertraege = vertraegeRepository.filter(v => v.partnerId === p.partnerId);
                const vertrag = vertraege[Math.floor(Math.random() * vertraege.length)];
                p.bezugId = vertrag.vsnr;
                p.bezugURI = `${server}/vertrag/${vertrag.vsnr}`;
            });
        
        res.status(200).json(items);
    };
}

module.exports = BriefkastenController;
