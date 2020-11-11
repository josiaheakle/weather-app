
import cloudBg from "./../media/cloudy.mp4"
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



    const loadData = (url) => {

        fetch(url, {mode: 'cors'})
        .then(function(response) { 
            console.log(response)
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
            console.log(`couldnt get data`)
            return false;
        });


    }

    const setBackground = () => {
        const type = data.weather[0].main;
        console.log(type)
        switch(type) {
            default:
            case('Clouds'): 
                import("./../media/cloudy.mp4")
                .then(videoSrc=> {
                    console.log(`setting video now`)
                    setBgVideo(videoSrc.default)
                })
                .catch(err => {
                    console.log(err)
                })
                break;
            case('Rain'):
                import("./../media/rain.mp4")
                .then(videoSrc=> {
                    setBgVideo(videoSrc.default)
                })
                .catch(err => {
                    console.log(err)
                })
                break;
            case('Snow'):
                import("./../media/snow.mp4")
                .then(videoSrc=> {
                    setBgVideo(videoSrc.default)
                })
                .catch(err => {
                    console.log(err)
                })
                break;
        }
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
            }
        } else {
            // const url = URLHelper.makeCityUrl(location);
            // if(loadData(url) === false) {
                alertWrongZipcode();
            // }
        }


        
    }

    const alertWrongZipcode = () => {
        const input = document.querySelector('#location-input')
        input.value = '';
        input.placeholder = "try again"
    }



    const updateUserPos = (lat, lon) => {
        loadData(URLHelper.makePosUrl(lat,lon))
    }

    const updateTempType = (tempType) => {
        setTempType(tempType)
    }

    
    useEffect(() => {
        



        loadData(URLHelper.makeZipUrl('12345'))
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
            <Header title={`My Weather`} onLocationUpdate={updateLocation} locationSubmit={applyLocation} newUserPos={updateUserPos} updateTempType={updateTempType} tempType={tempType} />
                {/* <div className='zipcode-form'>
                    <form onSubmit={(e)=> e.preventDefault()}>                
                        <input onChange={updateZipcode} id="zip" name="zip" type="text" placeholder='00000' />
                        <button className='submit-button' onClick={applyZipcode}> Submit </button>
                    </form>
                </div> */}
                {(data.main)?(
                    <WeatherData data={data} tempType={tempType} />
                ):null} 
                {/* <video className='background-video' autoPlay loop muted src={bgVideo} ></video> */}

        </div>
    );

}

export default Weather;