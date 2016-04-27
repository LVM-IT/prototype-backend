'use strict';

/**
 * @public
 * @constructor
 */
function BriefkastenRepository(server) {
    return [
        { userId: 'm50000', entryId: 7710, datum: '01.03.2016', text: 'UB-Vorlage', bezug: null, bezugId: -1, bezugURI: null, partnerId: 4711 },
        { userId: 'm50000', entryId: 7711, datum: '02.03.2016', text: 'Wiedervorlage', bezug: 'Vertrag', bezugId: 6711, bezugURI: `${server}/vertrag/6711`, partnerId: 4712 },
        { userId: 'm50000', entryId: 7712, datum: '03.03.2016', text: 'UB-Vorlage', bezug: null, bezugId: -1, bezugURI: null ,partnerId: 4711},
        { userId: 'm50000', entryId: 7713, datum: '04.03.2016', text: 'Wiedervorlage', bezug: 'Vertrag', bezugId: 6712, bezugURI: `${server}/vertrag/6712` ,partnerId: 4712},
        { userId: 'm50000', entryId: 7714, datum: '05.03.2016', text: 'UB-Vorlage', bezug: null, bezugId: -1, bezugURI: null ,partnerId: 4713},
        { userId: 'm50000', entryId: 7715, datum: '06.04.2016', text: 'Wiedervorlage', bezug: 'Vertrag', bezugId: 6713, bezugURI: `${server}/vertrag/6713` ,partnerId: 4714},
        { userId: 'm50000', entryId: 7716, datum: '07.04.2016', text: 'UB-Vorlage', bezug: null, bezugId: -1, bezugURI: null ,partnerId: 4717},
        { userId: 'm50000', entryId: 7717, datum: '08.04.2016', text: 'Wiedervorlage', bezug: 'Vertrag', bezugId: 6714, bezugURI: `${server}/vertrag/6714` ,partnerId: 4719},
        { userId: 'm50000', entryId: 7718, datum: '09.04.2016', text: 'UB-Vorlage', bezug: null, bezugId: -1, bezugURI: null ,partnerId: 4712},
        { userId: 'm50000', entryId: 7719, datum: '10.05.2016', text: 'Wiedervorlage', bezug: 'Vertrag', bezugId: 6715, bezugURI: `${server}/vertrag/6715` ,partnerId: 4718}
    ];
}

module.exports = BriefkastenRepository;
