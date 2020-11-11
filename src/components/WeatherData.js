


import "./css/WeatherData.css"

// utilities
import TempHelper from "./../util/TempHelper.js"

// react
import { useState, useEffect } from "react"

const WeatherData = ( props ) => {

    // props -
    // tempType
    // data
    // zip


    const [weatherIcon, setWeatherIcon ] = useState(null);

    const getWeatherIcon = () => {
        fetch(`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`, {mode: 'cors'})
        .then(function(response) { 
            setWeatherIcon(response.url)
        })
        // .then(function(response) {
        //     setData(response)
        //     return response;
        // })
        .catch(function(err) {
            return false;
        });
    }

    const convertToTemp = (temp) => {
        return `${TempHelper.fOrC(props.tempType)(temp)}°${(props.tempType.toUpperCase())}`
    }

    useEffect(() => {
        getWeatherIcon();
    }, [props.data.weather])

    return(
        <div className='WeatherData' >
                <div className='weather-card'>
                    <div className='data-container'>
                        <h1 id="location-name">{`${props.data.name}`}</h1>
                        <p id='zip-code'> {(props.zip && props.zip !== '00000')? props.zip:null} </p>

                        <div className='weather-data-header'>

                            <div className='weather-main'>
                                <div className='flex-column'>
                                    <img className='weather-icon' src={weatherIcon} />
                                    <div className='flex-row'>
                                        <span id="current-temp">{`${convertToTemp(props.data.main.temp)}`}</span>
                                        {/* {`Feels like ${convertToTemp(props.data.main.feels_like)}`} */}
                                        <span id="header-description">{props.data.weather[0].description}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='hi-lo-container flex-row'>
                                <div className='flex-row'>
                                    <span id='hi-temp'>{`Hi: ${convertToTemp(props.data.main.temp_max)}`}</span>
                                    <span id='lo-temp'>{`Lo: ${convertToTemp(props.data.main.temp_min)}`}</span>
                                </div>
                            </div>
                            <div className='feels-like flex-row'>
                                <div className='flex-row'>
                                    <span id='label'>{`Feels like:`}</span>
                                    <span id='feels-like-temp'>{`${convertToTemp(props.data.main.feels_like)}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default WeatherData;