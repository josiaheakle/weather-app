require('dotenv').config();

const URLHelper = (() => {

    const API_KEY = process.env.REACT_APP_API_KEY;

    const makeZipUrl = (zipcode) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${API_KEY}`
        return url;
    }

    // lat={lat}&lon={lon}&appid=
    const makePosUrl = (lat,lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`    
        return url;

    }

    const makeWeeklyZipUrl = (lat, lon) => {
        // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`    
        return url;
    }

    const makeWeeklyPosUrl = (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`    
        return url;
    }

    // makeCityUrl = (city) => {
    //     const url = ''
    // }


    return{
        makeZipUrl, makePosUrl, makeWeeklyPosUrl, makeWeeklyZipUrl
    }
})();

export default URLHelper;