

const URLHelper = (() => {

    const makeZipUrl = (zipcode) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=7d0891696676f69490cab1e2c12216ba`
        return url;
    }

    // lat={lat}&lon={lon}&appid=
    const makePosUrl = (lat,lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d0891696676f69490cab1e2c12216ba`    
        return url;

    }

    // makeCityUrl = (city) => {
    //     const url = ''
    // }


    return{
        makeZipUrl, makePosUrl,
    }
})();

export default URLHelper;