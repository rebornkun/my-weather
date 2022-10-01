import './Stat.css'
import clearCloudy from '../../Assets/clear-cloudy.svg';


const Stat = ({currentTemp, currentWeather ,currentWeatherType, currentUnits}) => {

    
    // currentWeather.main.temp === "" ? temp = currentWeather.main.temp : temp = 0

    
    return(
        <div className='display_board_details_temp_and_weather'>
            <div className='display_board_details_temp'>
                <p>{currentTemp} {currentUnits[0]}</p>
                <img src={clearCloudy} alt='weather icon' />
            </div>
            {/* <p className='display_board_details_weather_text'></p>   */}
        </div>
    );

}

export default Stat;