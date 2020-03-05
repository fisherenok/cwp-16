const axios = require('axios');
const Promise = require('bluebird');
const geolib = require('geolib');


(async function f() {
    //TASK 01
    const cities = await Promise.all([
        axios.get('https://geocode.xyz/Minsk?json=1'),
        axios.get('https://geocode.xyz/Madrid?json=1'),
        axios.get('https://geocode.xyz/Rome?json=1'),
    ]);
    console.log('--------------------------------TASK 01--------------------------------');
    cities.forEach((value) => {
        console.log(`${value.data.standard.city} - ${value.data.standard.countryname}`);
    });
    //TASK 02
    const country = await Promise.any([
        axios.get('https://geocode.xyz/Paris?json=1'),
        axios.get('https://geocode.xyz/Nice?json=1')
    ]);
    console.log('--------------------------------TASK 02--------------------------------');
    console.log(`${country.data.standard.countryname} - ${country.data.standard.city}`);
    //TASK 03
    const distance = await Promise.all([
        axios.get('https://geocode.xyz/Minsk?json=1'),
        axios.get('https://geocode.xyz/Brest?json=1')
    ]);
    console.log('--------------------------------TASK 03--------------------------------');
    console.log(`${
        geolib.getDistance(
            {latitude: distance[0].data.latt, longitude: distance[0].data.longt},
            {latitude: distance[1].data.latt, longitude: distance[1].data.longt}
        )
    }`);
    //TASK 04
    const findNearest = await Promise.all([
        axios.get('https://geocode.xyz/Minsk?json=1'),
        axios.get('https://geocode.xyz/Oslo?json=1'),
        axios.get('https://geocode.xyz/Copenhagen?json=1'),
        axios.get('https://geocode.xyz/Brussels?json=1'),
    ]);
    console.log('--------------------------------TASK 04--------------------------------');
    const res = geolib.findNearest({ latitude: findNearest[0].data.latt, longitude: findNearest[0].data.longt }, [
        { latitude: findNearest[1].data.latt, longitude: findNearest[1].data.longt },
        { latitude: findNearest[2].data.latt, longitude: findNearest[2].data.longt },
        { latitude: findNearest[3].data.latt, longitude: findNearest[3].data.longt }
    ]);
    console.log(res)

})();