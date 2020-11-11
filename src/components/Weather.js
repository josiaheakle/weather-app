
// import cloudBg from "./../media/cloudy.mp4"

import jeIcon from "./../media/favicon.ico"
import ghIcon from "./../media/GitHub.png"
// import rainBg from "./../media/rain.mp4"
// import snowBg from "./../media/snow.mp4"

import Header from "./Header.js"
import { useEffect, useState } from "react"

import "./css/Weather.css"


import URLHelper from "../util/URLHelper.js"
import WeatherData from "./WeatherData.js"

// weather api 
const API_KEY = '7d0891696676f69490cab1e2c12216ba';
const DATA_URL = `https://api.openweathermap.org/data/2.5/weather?zip=37934,us&appid=7d0891696676f69490cab1e2c12216ba`

// HANDLES API 
const Weather = () => {


    // weather types
    // Clouds
    // Clear
    // Rain
    // Snow
    // Mist


    const [ bgVideo, setBgVideo ] = useState(null)
    const [ data, setData ] = useState({});
    const [ location, setLocation ] = useState('00000');
    const [ tempType, setTempType ] = useState('f')
    const [ zip, setZip ] = useState('12345')



    const loadData = (url) => {

        fetch(url, {mode: 'cors'})
        .then(function(response) { 
            if(response.status == '404') {
                alertWrongZipcode();
                // break;
            }
            return response.json()
        })
        .then(function(response) {
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
            // const url = URLHelper.makeCityUrl(location);
            // if(loadData(url) === false) {
                alertWrongZipcode();
                loadData(URLHelper.makeZipUrl('12345'))
                setZip('12345')
            // }
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
    }

    const updateTempType = (tempType) => {
        setTempType(tempType)
    }

    
    useEffect(() => {
        


        setLocation('12345')
        setZip('12345')
        loadData(URLHelper.makeZipUrl(zip))
        // loadData(makeZipUrl('37934'));
    },[])

    useEffect(() =>{
        if(data.weather){
            // setBackground();
        }  
    }, [data])


    // userGeoPos={} 

    return (
        <div className="Weather">
            <Header title={`My Climate`} onLocationUpdate={updateLocation} locationSubmit={applyLocation} newUserPos={updateUserPos} updateTempType={updateTempType} tempType={tempType} />
                {/* <div className='zipcode-form'>
                    <form onSubmit={(e)=> e.preventDefault()}>                
                        <input onChange={updateZipcode} id="zip" name="zip" type="text" placeholder='00000' />
                        <button className='submit-button' onClick={applyZipcode}> Submit </button>
                    </form>
                </div> */}
                {(data.main)?(
                    <WeatherData zip={zip} data={data} tempType={tempType} />
                ):<div className='no-results-found'>
                    <span>No data found, try again...</span>
                
                  </div>} 
                {/* <video className='background-video' autoPlay loop muted src={bgVideo} ></video> */}
            <div className='footer'>
                <span id='contributors'></span>
                <div id='portfolio-and-gh'> 
                    {'< '}Created by 
                    <a title='Josiah Eakle' id="portfolio-link" href='https://www.josiaheakle.com' >
                        <span>Josiah Eakle</span> 
                        {/* <img className='footer-icon' id='portfolio-link-img' src={jeIcon}></img>  */}
                    </a> 
                    <a title='See the code!' id="github-link" href='https://github.com/josiaheakle/weather-app' > 
                        <img className='footer-icon' id='github-link-img' src={ghIcon}></img> 
                    </a> 
                    {'>'}
                </div>
            </div>
        </div>
    );

}

export default Weather;