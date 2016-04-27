'use strict';

/**
 * @public
 * @constructor
 */
function HaushaltRepository(server) {
    return [
        {partnerId: 4711, beziehung: 'Lebensgefährte', name: 'Schmitt', vorname: 'Petra', geburtsdatum:'23.04.1974'},
        {partnerId: 4712, beziehung: 'Lebensgefährte', name: 'Bayer', vorname: 'Klaus', geburtsdatum: '30.06.1976'},
        {partnerId: 4712, beziehung: 'Lebensgefährte', name: 'Marx', vorname: 'Timo', geburtsdatum: '01.05.1968'},
        {partnerId: 4714, beziehung: 'Lebensgefährte', name: 'Solinske', vorname: 'Clara', geburtsdatum: '05.12.1983'},
        {partnerId: 4715, beziehung: 'Lebensgefährte', name: 'Müller', vorname: 'Selma', geburtsdatum: '09.11.1975'},
        {partnerId: 4715, beziehung: 'Lebensgefährte', name: 'Braun', vorname: 'Giovanni', geburtsdatum: '11.01.1976'},
        {partnerId: 4717, beziehung: 'Lebensgefährte', name: 'Wiegner', vorname: 'Nina', geburtsdatum: '25.02.1962'},
        {partnerId: 4718, beziehung: 'Lebensgefährte', name: 'Müller', vorname: 'Carina', geburtsdatum: '21.08.1990'},
        {partnerId: 4720, beziehung: 'Lebensgefährte', name: 'Serwe', vorname: 'Maraike', geburtsdatum: '17.11.1972'},
        {partnerId: 4720, beziehung: 'Lebensgefährte', name: 'Kirsch', vorname: 'Ursula', geburtsdatum: '28.02.1975'}
    ];
}

module.exports = HaushaltRepository;
