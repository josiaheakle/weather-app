
// import cloudBg from "./../media/cloudy.mp4"

// import jeIcon from "./../media/favicon.ico"
// import ghIcon from "./../media/GitHub.png"
// import rainBg from "./../media/rain.mp4"
// import snowBg from "./../media/snow.mp4"

import Header from "./Header.js"
import Footer from "./Footer.js"
import { useEffect, useState } from "react"

import "./css/Weather.css"


import URLHelper from "../util/URLHelper.js"
import WeatherData from "./WeatherData.js"


// HANDLES API 
const Weather = () => {

    // weather types
    // Clouds
    // Clear
    // Rain
    // Snow
    // Mist

    const [ data, setData ] = useState({});
    const [ location, setLocation ] = useState('00000');
    const [ tempType, setTempType ] = useState('f');
    const [ zip, setZip ] = useState('12345');

    const loadData = (url) => {

        fetch(url, {mode: 'cors'})
        .then(function(response) { 
            
            if(response.status === '404') {
                alertWrongZipcode();
                // break;
            }
            return response.json()
        })
        .then(function(response) {
            console.log(response)
            setData(response)
            return response;
        })
        .catch(function(err) {
            return false;
        });


    }



    const updateLocation = (event) => {
        let val = event.target.value;
        setLocation(val);

    }

    const applyLocation = () => {

        let locIsNum = !isNaN(location);

        if(location.length === 5 && locIsNum) {
            const url = URLHelper.makeZipUrl(location);
            if(loadData(url) === false) {
                alertWrongZipcode();
            } else {
                setZip(location)
            }
        } else {
                alertWrongZipcode();
                loadData(URLHelper.makeZipUrl('12345'))
                setZip('12345')
        }


        
    }

    const alertWrongZipcode = () => {
        const input = document.querySelector('#location-input')
        input.value = '';
        input.placeholder = "try again"
        setZip('00000')

    }

    const updateUserPos = (lat, lon) => {
        setZip('00000')
        loadData(URLHelper.makePosUrl(lat,lon))
        // loadData(URLHelper.makeWeeklyPosUrl(lat,lon))
    }

    const updateTempType = (tempType) => {
        setTempType(tempType)
    }

    
    useEffect(() => {
        setLocation('12345')
        setZip('12345')
        loadData(URLHelper.makeZipUrl('12345'));
    },[])

    return (
        <div className="Weather">
            <Header title={`My Climate`} onLocationUpdate={updateLocation} locationSubmit={applyLocation} newUserPos={updateUserPos} updateTempType={updateTempType} tempType={tempType} />
                {(data.main)?(
                    <WeatherData zip={zip} data={data} tempType={tempType} />
                ):<div className='no-results-found'>
                    <span>No data found, try again...</span>
                
                  </div>} 
            <Footer />
            {/* <div className='footer'>
                <span id='contributors'></span>
                <div id='portfolio-and-gh'> 
                    {'< '}Created by 
                    <a title='Josiah Eakle' id="portfolio-link" href='https://www.josiaheakle.com' >
                        <span>Josiah Eakle</span> 
                    </a> 
                    <a title='See the code!' id="github-link" href='https://github.com/josiaheakle/weather-app' > 
                        <img className='footer-icon' id='github-link-img' src={ghIcon}></img> 
                    </a> 
                    {'>'}
                </div>
            </div> */}
        </div>
    );

}

export default Weather;