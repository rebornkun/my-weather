import './Weekly.css'
import clearCloudy from '../../Assets/clear-cloudy.svg';


const Weekly = ({key, fortheday, forcastDaily, currentUnits, getTheDay}) => {

    let daytemp = fortheday.temp.min.toFixed(0)
    let id = fortheday.id
    let timezone = forcastDaily.city.timezone
    let timestamp = fortheday.dt + timezone
    let formatedTimeArray = getTheDay(timestamp)

    return(
        <div className='weekly_container'>
            <div className='weekly_day_date'>
                <p>{id === 0 ? "Today" : id === 1 ? "Tommorow" : formatedTimeArray[0]}</p>
                <p>{formatedTimeArray[2]} {formatedTimeArray[1]}</p>
            </div>
            <p className='weekly_degree'>{daytemp}{currentUnits[0]}</p>
            <img className='weekly_weather_icon' src={clearCloudy} alt='weather icon'/>
        </div>
    );

}

export default Weekly;