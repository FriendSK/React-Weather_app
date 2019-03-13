import React from 'react';

const Weather = props => {
    return (
        <div className="weather-info">
            {props.city && <p className="weather__key">Местоплоложение: 
            <span className="weather__value"> {props.city},  {props.country}</span> </p>}
            {props.temp && <p className="weather__key">Температура: 
            <span className="weather__value">{props.temp} &#176; C</span></p>}
            {props.sunrise && <p className="weather__key">Восход солнца: 
            <span className="weather__value"> {props.sunrise}</span></p>}
            {props.sunset && <p className="weather__key">Заход солнца: 
            <span className="weather__value">{props.sunset}</span></p>}

            <p className="weather__error">{props.error}</p>
        </div>
    )
}
export default Weather;