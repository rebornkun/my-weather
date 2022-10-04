import './Stat.css'

//weather icons
import clearCloudy from '../../Assets/clear-cloudy.svg';
import clearCloudyNight from '../../Assets/clear-cloudy-night.svg';
import cloudy from '../../Assets/cloudy.svg';
import drizzleNight from '../../Assets/drizzle-night.svg';
import drizzleSunny from '../../Assets/drizzle-sunny.svg';
import drizzle from '../../Assets/drizzle.svg';
import fog from '../../Assets/fog.svg';
import hail from '../../Assets/hail.svg';
import lightning from '../../Assets/lightning.svg';
import mostlyCloudyNight from '../../Assets/mostly-cloudy-night.svg';
import partlyCloudy from '../../Assets/partly-cloudy.svg';
import sleet from '../../Assets/sleet.svg';
import snowFlurries from '../../Assets/snow-flurries.svg';
import snow from '../../Assets/snow.svg';
import stormy from '../../Assets/stormy.svg';
import thunderstromsTwo from '../../Assets/thunderstroms-two.svg';
import thunderstromsSunnyNight from '../../Assets/thunderstroms-sunny-night.svg';
import thunderstromsSunny from '../../Assets/thunderstroms-sunny.svg';
import thunderstroms from '../../Assets/thunderstroms.svg';
import tornado from '../../Assets/tornado.svg';
import windy from '../../Assets/windy.svg';

const Stat = ({currentTemp, currentWeather ,currentWeatherType, currentUnits, changeWeatherImg, timeOfDay}) => {

    
    let icon = changeWeatherImg(timeOfDay, currentWeatherType.main, currentWeatherType.description)

    return(
        <div className='display_board_details_temp_and_weather'>
            <div className='display_board_details_temp'>
                <p>{currentTemp}{currentUnits[0]}</p>
                {/* <img alt='weather icon' src={icon}  /> */}
                {icon}
            </div>
            <p className='display_board_details_weather_text'>{currentWeatherType.description}</p>  
        </div>
    );

}

export default Stat;