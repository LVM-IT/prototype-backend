'use strict';

/**
 * @public
 * @constructor
 */
function VertraegeRepository(server) {
    let currentId = 0;

    function generateData() {
        const vsnr = Math.floor(Math.random() * 899999999 + 100000000);
        return {
            vsnr: vsnr,
            partnerId: 4711 + (currentId++ % 15),
            sparte: 'Kraftfahrt',
            beitragZent: Math.floor(Math.random() * 40000 + 2000),
            vertragURI: `http://${server}/vertrag/${vsnr}`,
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
            vorschaeden: [
                { datum: '20.07.2015', schadenhoehe: 3500 },
                { datum: '20.09.2015', schadenhoehe: 1500 }
            ],
            vorversicherer: [
                { name: 'HUK', kuendigungsgrund: 'durch Versicherungsnehmer' },
                { name: 'Allianz', kuendigungsgrund: 'Schaden' }
            ],
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

    for (let i = 0; i < 44; i++) {
        result.push(generateData());
    }

    return result;
}

module.exports = VertraegeRepository;
