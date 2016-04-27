'use strict';

/**
 * @public
 * @constructor
 */
function BerufeController(opts) {
    const berufeRepository = opts.berufeRepository;

    this.list = (req, res) => {
        let result = berufeRepository;

        if (req.query.q) {
            let query = req.query.q;
            query = query.toLowerCase();

            result = result.filter(beruf => beruf.name.toLowerCase().indexOf(query) > -1);
        }

        res.status(200).json(result);
    };
}

module.exports = BerufeController;
