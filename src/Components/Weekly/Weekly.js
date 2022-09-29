import './Weekly.css'
import clearCloudy from '../../Assets/clear-cloudy.svg';


const Weekly = () => {

    return(
        <div className='weekly_container'>
            <div className='weekly_day_date'>
                <p>Tommorow</p>
                <p>12 Apr</p>
            </div>
            <p className='weekly_degree'>16&deg;</p>
            <img className='weekly_weather_icon' src={clearCloudy} alt='weather icon'/>
        </div>
    );

}

export default Weekly;