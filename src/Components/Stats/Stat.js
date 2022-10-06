import './Stat.css'

//weather icons


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