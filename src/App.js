import React from 'react';
import Info from './components/Info';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'abf4ec5fb246141571c859102bc01279';

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    };

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        if (city) {

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
                .then(res => res.json())
                .then((data) => {
                    if (data.cod === '404') {
                        this.setState({
                            temp: undefined,
                            city: undefined,
                            country: undefined,
                            sunrise: undefined,
                            sunset: undefined,
                            error: 'Такого города не существует!'
                        });
                    } else {

                        let sunset = data.sys.sunset;
                        let date = new Date();
                        date.setTime(sunset * 1000);
                        let sunset_date = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();

                        let sunrise = data.sys.sunrise;
                        let date2 = new Date();
                        date2.setTime(sunrise * 1000);
                        let sunrise_date = date2.getUTCHours() + ':' + date2.getUTCMinutes() + ':' + date2.getUTCSeconds();

                        this.setState({
                            temp: data.main.temp,
                            city: data.name,
                            country: data.sys.country,
                            sunrise: sunrise_date,
                            sunset: sunset_date,
                            error: undefined
                        });
                    }
                })
        } else {
            this.setState({
                error: 'Введите название города на английском языке!'
            });
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 title-container">
                                    <Info />
                                </div>
                                <div className="col-sm-6 form-container">
                                    <Form weatherMethod={this.gettingWeather} />
                                    <Weather
                                        temp={this.state.temp}
                                        city={this.state.city}
                                        country={this.state.country}
                                        sunrise={this.state.sunrise}
                                        sunset={this.state.sunset}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default App;
