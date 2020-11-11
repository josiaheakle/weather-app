


import "./css/WeatherData.css"

// utilities
import TempHelper from "./../util/TempHelper.js"

// react
import { useState, useEffect } from "react"

const WeatherData = ( props ) => {

    // props -
    // tempType
    // data


    const [weatherIcon, setWeatherIcon ] = useState(null);

    const getWeatherIcon = () => {
        fetch(`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`, {mode: 'cors'})
        .then(function(response) { 
            console.log(response)
            setWeatherIcon(response.url)
        })
        // .then(function(response) {
        //     setData(response)
        //     return response;
        // })
        .catch(function(err) {
            console.log(`couldnt get data`)
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

                        <div className='weather-data-header'>
                            <img className='weather-icon' src={weatherIcon} />

                            <div className='flex-row'>
                                <span id="current-temp">{`${convertToTemp(props.data.main.temp)}`}</span>
                                {/* {`Feels like ${convertToTemp(props.data.main.feels_like)}`} */}
                                <span id="header-description">{props.data.weather[0].description}</span>
                            </div>

                        </div>
                        <h1>{`Weather Type: ${props.data.weather[0].description}`}</h1>
                    </div>
                </div>
        </div>
    );
}

export default WeatherData;