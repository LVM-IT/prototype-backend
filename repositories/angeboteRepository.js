'use strict';

/**
 * @public
 * @constructor
 */
function AngeboteRepository(server) {
    let currentId = 0;

    function generateData() {
        const angebotId = currentId++;
        return {
            angebotId: angebotId,
            partnerId: 4711 + (currentId % 15),
            angebotURI: `${server}/angebot/` + angebotId,
            sparte: 'Kraftfahrt',
            rolle: 'Versicherungsnehmer',
            agentur: '2008/21',
            versichertist: 'M-RS 6',
            schaeden: 0,
            ablauf: '',
            zahlungsweise: 'jährlich',
            beitragZent: 9999,
            fahrzeugdaten: {
                fahrzeugart: 'PKW',
                kennzeichen: 'MS-CH 444',
                hsn: 432,
                typschl: 234,
                erstzulassung: '20.05.2015',
                fahrgestell: 'dj3rij35j42',
                fahrzeugstaerkePS: 340,
                austauschmotor: false,
                kennzeichenart: 'schwarzes Kennzeichen',
                wechselkennzeichen: false
            },
            nutzung: {
                beliebigeFahrer: 'unbekannt',
                nachtAbstellplatz: 'Straßenrand',
                fahrleistungKm: 30000,
                kilometerstand: 120433,
                abweichenderFahrzeughalter: false,
                nutzung: 'privat',
                selbstGenEigentum: true,
                wohneigentumart: 'Wohnung'

            },
            versSchutz: {
                haftpflichSFR: 'SF0 10%',
                volkaskoSFR: 'SF0 57%',
                tarifgruppe: 'normal',
                rahmenvertrag: 'keiner',
                versBeginn: '25.02.2016',
                zahlungsweise: 'monatlich'

            }
        }
    }

    let result = [];

    for (let i = 0; i < 75; i++) {
        result.push(generateData());
    }

    return result;
}

module.exports = AngeboteRepository;
