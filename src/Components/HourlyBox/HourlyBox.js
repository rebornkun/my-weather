import './HourlyBox.css'
import clearCloudy from '../../Assets/clear-cloudy.svg';


const HourlyBox = ({key, forThreeHours, forcastWeatherHours, currentUnits, covertTimeToUTC, changeWeatherImg, timeOfDay}) => {

    let timezone =  forcastWeatherHours.city.timezone
    let hourlytemp = forThreeHours.main.temp.toFixed(1)
    let id = forThreeHours.id
    let timestamp = forThreeHours.dt + timezone
    let formatedTimeArray = covertTimeToUTC(timestamp)

    let icon = changeWeatherImg(timeOfDay, forThreeHours.weather[0].main, forThreeHours.weather[0].description)


    return(
        <div className='HourlyBox_container'>
            <div className={ id === 0 ? 'today_forecast_hourly_box_normal special' : 'today_forecast_hourly_box_normal'}>
                <p className={ id === 0 ? 'today_forecast_hourly_box_time_nom special' : 'today_forecast_hourly_box_time_nom'}>{id === 0 ? "Now" : formatedTimeArray}</p>
                {icon}
                <p className={ id === 0 ? 'today_forecast_hourly_box_temp_nom special' : 'today_forecast_hourly_box_temp_nom'}>{hourlytemp} {currentUnits[0]}</p>
            </div>
        </div>
    );

}

export default HourlyBox;