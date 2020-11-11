

import { useState, useEffect } from "react"
import "./css/Header.css"

const Header = ( props ) => {

    // props -
    // title
    // tempType
    // onLocationUpdate -- passes event onchange to parent
    // locationSubmit
    // userGeoPos
    // newUserPos -- passes lat and lon  to parent
    // updateTempType -- passes f or c to parent to show temp type


    const [ userPos, setUserPos ] = useState(null);
    const [ tempType, setTempType ] = useState('f')
    

    const getUserPosition = () => {
            

        // pos.coords.latitude
        // pos.coords.longitude
        navigator.geolocation.getCurrentPosition((pos)=>{
            props.newUserPos(pos.coords.latitude, pos.coords.longitude)


            console.log(pos.coords.longitude)
        });


    }

    const updateTempType = (str) => {
        props.updateTempType(str)
        setTempType(str)
    } 

    const changeTemp = (event) => {
        if(event.target.checked === false) {
            updateTempType('f')
        } else {
            updateTempType('c')
        }
    }

    useEffect(() => {
        console.log(`tempType changed!`)
    }, [props.tempType])

    useEffect(() => {
        updateTempType(props.tempType)
    }, [])

    return (
        <div className='Header'>
            <div className='header-container'>
                <h1>{props.title}</h1>
                <div className='header-search-container'>
                    <span className='search-bar-container'>
                        <button className='search-bar-button' id='current-position-button' onClick={getUserPosition}>
                            <i className="material-icons"> location_on
                            </i>
                        </button>
                        <input id='location-input' onChange={props.onLocationUpdate} type='text'></input>
                        <button className='search-bar-button' id='search-submit-button' onClick={props.locationSubmit}>
                            <i className="material-icons">
                            search
                            </i>
                        </button>
                    </span>
                </div>
                <div className='temp-toggle-container'>
                    <label className="switch">
                        <input onChange={changeTemp} id='celcius-checkbox' type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                    <p className='temp-name'>{(tempType === 'f')?'Fahrenheit':'Celcius'}</p>
                </div>
            </div>
        </div>
    );
}

export default Header;