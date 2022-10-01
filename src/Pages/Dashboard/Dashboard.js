import SearchBox from '../../Components/SearchBox/SearchBox';
import Weekly from '../../Components/Weekly/Weekly';
import clearCloudy from '../../Assets/clear-cloudy.svg';
import './Dashboard.css'
import { useEffect, useState } from 'react';
import Choose from '../../Components/Choose/Choose';
import Stat from '../../Components/Stats/Stat';


const Dashboard = () => {

    const [searchField, setSearchField] = useState('')
    const [query, setQuery] = useState('')
    const [geo, setGeo] = useState([])
    const [choose, setChoose] = useState(false)
    const [unit, setUnit] = useState('default')
    const [currentWeather, SetCurrentWeather] = useState({})
    const [currentWeatherType, SetCurrentWeatherType] = useState({})

    const [currentCountry, SetCurrentCountry] = useState('')
    const [currentTime, SetCurrentTime] = useState('')
    const [currentTemp, SetCurrentTemp] = useState('')
    const [currentPressure, SetCurrentPressure] = useState('')
    const [currentWindSpeed, SetCurrentWindSpeed] = useState('')
    const [currentUnits, SetCurrentUnits] = useState([])

    //local variables to pass to state
    let currentWeatherCountry;
    let currentWeatherTime;
    let currentWeatherTemp;
    let currentWeatherPressure;
    let currentWeatherWindSpeed;
    let currentWeatherTimeZone;
    let AM_or_PM;
    let dummyweather 

    // units
    let TempUnit 
    let pressureUnit 
    let windSpeedUnit 
    


    let key = '7cdde76b930c2cf6be0b92a377a351f1'
    let url = 'http://api.openweathermap.org/'
    function handleSearchChange(e){
        // console.log(e.target.value)
    }

    useEffect(() => {
        // handleSeachClick()
        getUnit()
        // getGeolocation()
        console.log('refresh')
        console.log('query: ', query)
        console.log('Geo: ', geo)
    },[geo,currentWeather])

    const handleSeachClick = (e) => {
        let searchbox = document.getElementById('search');
        let searchboxvalue = searchbox.value;
        
        setQuery(searchboxvalue)

        // fetching Geolocation
        const getGeolocation = async function(){
        
            const rawGeo = await fetch(`${url}geo/1.0/direct?q=${searchboxvalue}&limit=3&appid=${key}`)
            console.log('fetch')
            searchboxvalue = ''
            const processedRawGeo = await rawGeo.json()
            
                if (processedRawGeo.length > 1){
                    const processedRawGeoWID = processedRawGeo.map((olocation , i) => {
                        return Object.assign(olocation, {id: i});
                    })
                    console.log(processedRawGeoWID)
                    setGeo(processedRawGeoWID)
                    setChoose(true)
                    // geoArray = geoArray.concat(processedRawGeo)
                    // console.log(`lat: ${lat}, lon: ${lon}`)
                    console.log(`geoArray: ${geo}`)
    
                }else if(processedRawGeo.length === 1){
    
                    setGeo(processedRawGeo[0])
                    setChoose(false)
                    getCurrentWeather(processedRawGeo[0].lat, processedRawGeo[0].lon)
                    // const lat = 
                    // const lon = 
    
                }
    
        }
        getGeolocation()
        
    }

    const getId = (id) => {
        // return id;
        let presentChoice = geo[id]
        getCurrentWeather(presentChoice.lat, presentChoice.lon)
        setChoose(false)
        console.log(presentChoice)
    }

    const getCurrentWeather = async function(lat, lon){
        
        const rawCurWeather = await fetch(`${url}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`)
        const processedRawCurWeather = await rawCurWeather.json()
        SetCurrentWeather(processedRawCurWeather)
        currentWeatherTime = processedRawCurWeather.dt;
        currentWeatherTimeZone = processedRawCurWeather.timezone;
        let totalcurrentWeatherTime = currentWeatherTime + currentWeatherTimeZone
        covertTimeToUTC(totalcurrentWeatherTime)

        currentWeatherCountry = processedRawCurWeather.sys.country
        SetCurrentWeatherType(processedRawCurWeather.weather[0])
        currentWeatherTemp = processedRawCurWeather.main.temp
        currentWeatherPressure = processedRawCurWeather.main.pressure
        currentWeatherWindSpeed = processedRawCurWeather.wind.speed
        shorten_chain(currentWeatherCountry, currentWeatherTemp, currentWeatherPressure, currentWeatherWindSpeed)
        // console.log('CurrentWeatherTime: ', currentWeatherTime)

    }

    const getUnit = () => {
        if (unit === 'metric'){
            // U+2109 ℉
            // U+2103
            TempUnit = String.fromCodePoint(parseInt(2103,16));
            windSpeedUnit = 'm/s'

        }else if (unit === 'imperial'){

            TempUnit = String.fromCodePoint(parseInt(2109,16));
            windSpeedUnit = 'Mi/h'
            
        }else if (unit === 'default'){

            TempUnit = 'K'
            windSpeedUnit = 'Mi/h'
            
            // &#8490
        }

        SetCurrentUnits([ TempUnit , windSpeedUnit])

    }

    const covertTimeToUTC = (Unix) => {

        let dateObj = new Date(Unix * 1000)

        let hours = dateObj.getUTCHours()
        let minutes = dateObj.getUTCMinutes()
        let seconds = dateObj.getUTCSeconds()
        let stringhours = hours.toString()
        let stringmin = minutes.toString()

        if (hours > 12){
            AM_or_PM = 'PM'
            hours = hours - 12
            //add 0 
            
        }else if(hours === 12){
            AM_or_PM = 'PM'

        }else{
            AM_or_PM = 'AM'
        }

        
        if (stringhours.length === 1){
            hours = `0${hours}`
        }
        if (stringmin.length === 1){
            minutes = `0${minutes}`
        }

        SetCurrentTime(`${hours}:${minutes}${AM_or_PM}`) 
    }

    //function to shorten chains due to not been able to pass directly
    const shorten_chain = (country, temp, pres, wind) => {
        SetCurrentCountry(country)
        temp = temp.toFixed(1)
        SetCurrentTemp(temp) 
        SetCurrentPressure(pres) 
        SetCurrentWindSpeed(wind)
    }

    console.log('currentWeather: ', currentWeather)
    console.log('currentWeathertype: ', currentWeatherType)
    console.log('dummyweather ',dummyweather)
    console.log('currentTemp ',currentTemp)


    return(
        <div className='dashboard'>
            <div className='dashboard_container'>
                <div className='dashboard_firstpart'>
                    <div className='dashboard_firstpart_top'>
                        <SearchBox handleSearchChange={handleSearchChange} handleSeachClick={handleSeachClick} />
                        <div className='dashboard_firstpart_top_other_buttons'>
                            <div className='notification_button'>
                                <i class="fa fa-bell-o" aria-hidden="true"><div className='notify'></div></i>
                                
                            </div>
                            <div className='Profile_button'>
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>

                    {/* show choose if queries are more than 1 */}
                    { choose ?

                    <div className='choose_dash_container'>
                        {
                            geo.map((location, index) => {
                                return (
                                <Choose 
                                    key={index}
                                    id={location.id} 
                                    name={location.name}
                                    state={location.state}
                                    country={location.country}
                                    lat={location.lat}
                                    lon={location.lon}
                                    getId={getId}
                                />
                                ); 
                            })
                        }
                    </div>

                    :


                    <div className='dashboard_firstpart_rest'>
                        <div className='dashboard_firstpart_rest_top'>
                            <div className='display_board'>
                                <div className='display_board_details'>
                                    <div className='display_board_details_location_and_date'>
                                        <div className='display_board_details_location'>
                                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                                            <p>{`${currentWeather.name}, ${currentCountry}`}</p> 
                                        </div>
                                        <div className='display_board_details_date'>
                                            <p>Today {currentTime}</p> 
                                        </div>
                                    </div>

                                        <Stat currentTemp={currentTemp} currentWeather={currentWeather} currentWeatherType={currentWeatherType} currentUnits={currentUnits} />
                                    
                                    <div className='display_board_details_others'>
                                        <div className='display_board_details_others_pressure'>
                                            <svg width="113" height="60" viewBox="0 0 113 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 40.3159C45.3658 40.3159 63.9683 38.2256 66.2387 37.1804C70.4865 36.0935 72.6105 33.8162 72.6105 28.7774C72.6105 23.6352 62.943 19.6218 56.5713 23.6352C51.4739 26.8459 50.1263 31.2021 50.4192 32.4145" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M28.0083 43.2006C54.3741 43.2006 72.9766 44.8896 75.247 45.7341C79.4948 46.6123 81.6188 48.4524 81.6188 52.5238C81.6188 56.6787 71.9513 59.9216 65.5796 56.6787C60.4822 54.0844 59.1346 50.5646 59.4275 49.585" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M28.0083 41.6956C69.0698 41.6956 98.0409 39.6058 101.577 38.5609C108.192 37.4742 111.5 35.1975 111.5 30.16C111.5 25.0192 96.4441 21.0068 86.5209 25.0192C78.5824 28.2291 76.4837 32.5842 76.9399 33.7962" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M0 27.9475C26.3658 27.9475 44.9683 24.9863 47.2387 23.5056C51.4865 21.9658 53.6105 18.7396 53.6105 11.6013C53.6105 4.31655 43.943 -1.36911 37.5713 4.31655C32.4739 8.86507 31.1263 15.0364 31.4192 16.7539" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M9.0083 32.0341C35.3741 32.0341 53.9766 34.4269 56.247 35.6233C60.4948 36.8675 62.6188 39.4743 62.6188 45.2421C62.6188 51.1282 52.9513 55.7223 46.5796 51.1282C41.4822 47.453 40.1346 42.4665 40.4275 41.0787" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M9.0083 29.902C50.0698 29.902 79.0409 26.9415 82.5768 25.4612C89.1923 23.9218 92.5 20.6964 92.5 13.56C92.5 6.27713 77.4441 0.592953 67.5209 6.27713C59.5824 10.8245 57.4837 16.9942 57.9399 18.7113" stroke="#6D6464" stroke-width="3"/>
                                            </svg>
                                            <p className='smallp'>{currentPressure}hpa</p>
                                            {/* <p className='smallp'>720hpa</p> */}
                                        </div>
                                        <div className='display_board_details_others_chance_rain'>
                                            <i class="fa fa-tint" aria-hidden="true"></i>
                                            <p className='smallp'>24%</p>
                                        </div>
                                        <div className='display_board_details_others_wind_speed'>
                                            <svg width="94" height="71" viewBox="0 0 94 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 35.8433C26.3658 35.8433 44.9683 31.9809 47.2387 30.0497C51.4865 28.0412 53.6105 23.8333 53.6105 14.5229C53.6105 5.02147 43.943 -2.39431 37.5713 5.02146C32.4739 10.9541 31.1263 19.0033 31.4192 21.2435" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M9.0083 41.1734C35.3741 41.1734 53.9766 44.2942 56.247 45.8546C60.4948 47.4775 62.6188 50.8775 62.6188 58.4004C62.6188 66.0777 52.9513 72.0697 46.5796 66.0777C41.4822 61.2841 40.1346 54.7802 40.4275 52.9702" stroke="#6D6464" stroke-width="3"/>
                                                <path d="M9.0083 38.3924C50.0698 38.3924 79.0409 34.5311 82.5768 32.6004C89.1923 30.5925 92.5 26.3856 92.5 17.0776C92.5 7.57867 77.4441 0.164819 67.5209 7.57866C59.5824 13.5097 57.4837 21.5568 57.9399 23.7964" stroke="#6D6464" stroke-width="3"/>
                                            </svg>
                                            <p className='smallp'>{`${currentWindSpeed} ${currentUnits[1]}`}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='display_board_temperature'>
                                    <p className='display_board_temperature_heading'>Temperature</p>
                                    <div className='display_board_temperature_stats'>
                                        <div className='display_board_temperature_today_temp_curve'>
                                            <div className='dot_container'>
                                                <div className='today_temp_unit_point_container'>
                                                    <div className='today_temp_unit_point morning'></div>
                                                </div>
                                                <div className='today_temp_unit_point_container'>
                                                    <div className='today_temp_unit_point afternoon'></div>   
                                                </div>
                                                <div className='today_temp_unit_point_container'>
                                                    <div className='today_temp_unit_point evening'></div>
                                                </div>
                                                <div className='today_temp_unit_point_container'>
                                                    <div className='today_temp_unit_point night'></div>
                                                </div>
                                            </div>
                                            {/* <div className='display_board_temperature_today_temp_curve_line'>
                                            <svg width="100%" height="34" viewBox="0 0 354 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1,0.5 A50,50 0 1,0 0.5,0.5 L30,100  " stroke="black" stroke-width="6"/>
                                            </svg>
                                            </div> */}
                                        </div>

                                        <div className='display_board_temperature_today_temp'>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Morning</p>
                                                <p className='today_temp_unit_temp'>15&deg;</p>
                                            </div>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Afternoon</p>
                                                <p className='today_temp_unit_temp'>14&deg;</p>
                                            </div>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Evening</p>
                                                <p className='today_temp_unit_temp'>16&deg;</p>
                                            </div>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Night</p>
                                                <p className='today_temp_unit_temp'>12&deg;</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='dashboard_firstpart_rest_buttom'>
                            <div className='dashboard_firstpart_rest_buttom_top'>
                                <div className='dashboard_firstpart_rest_buttom_left_box'>
                                    <div className='text_part'>
                                        <p className='text_part_bold_text'>Wind</p>
                                        <p className='text_part_light_text'>Today Wind Speed</p>
                                        <p className='text_part_bold_text'>12km/h</p>
                                    </div>
                                    <div className='meter'>
                                        <div className='meter_circle'>
                                            <div className='cardinal_points'>
                                                <div className='cardinal_points_top'>
                                                    <p className='cardinal_points_N'>N</p>
                                                </div>   
                                                <div className='cardinal_points_middle'>
                                                    <p className='cardinal_points_W'>W</p>
                                                    <p className='cardinal_points_E'>E</p>
                                                </div>
                                                <div className='cardinal_points_bottom'>
                                                    <p className='cardinal_points_S'>S</p>
                                                </div>
                                            </div>
                                            <svg width="100%" height="20" viewBox="0 0 141 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 10H129" stroke="black" stroke-width="6"/>
                                                <path d="M141 10L126 1.33974V18.6603L141 10Z" fill="black"/>
                                                <circle cx="10" cy="10" r="7" stroke="black" stroke-width="6"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className='dashboard_firstpart_rest_buttom_right_box'>
                                    <div className='text_part'>
                                        <p className='text_part_bold_text'>Rain Chance</p>
                                        <p className='text_part_light_text'>Today Rain Chance</p>
                                        <p className='text_part_bold_text'>24%</p>
                                    </div>
                                    <div className='meter'>
                                        <div className='meter_circle no_border'>
                                            <div className='meter_circle_rain_inner_circle_loading'>
                                            </div>
                                            <div className='meter_circle_rain_last_circle'>
                                                <p>Low</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='dashboard_firstpart_rest_buttom_buttom'>
                                <div className='dashboard_firstpart_rest_buttom_left_box'>
                                    <div className='text_part'>
                                        <p className='text_part_bold_text'>Pressure</p>
                                        <p className='text_part_light_text'>Today Wind Speed</p>
                                        <p className='text_part_bold_text'>729 hpa</p>
                                    </div>
                                    <div className='meter'>
                                        <div className=' no_border pressure_circle'>
                                        <div className='meter_circle_rain_inner_circle_loading'>
                                            </div>
                                            
                                            <div className='meter_circle_pressure_last_circle'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='dashboard_firstpart_rest_buttom_right_box'>
                                    <div className='text_part'>
                                        <p className='text_part_bold_text'>Uv Index</p>
                                        <p className='text_part_light_text'>Today Uv Index</p>
                                        <p className='text_part_bold_text'>2</p>
                                    </div>
                                    <div className='meter'>
                                        <div className='meter_circle no_border'>
                                            <div className='meter_circle_uv_inner_circle_loading'>
                                            </div>
                                            <div className='meter_circle_uv_last_circle'>
                                                <p>Low</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    }
                </div>

                <div className='dashboard_secondpart'>
                    <p className='dashboard_secondpart_title'>This Week</p>
                    <div>
                        <div className='today_forecast_hourly'>
                            <p className='today_forecast_hourly_title'>Today</p>
                            <div className='today_forecast_hourly_box_container'>
                                <div className='today_forecast_hourly_box_container_row'>
                                    <div className='today_forecast_hourly_box'>
                                        <p className='today_forecast_hourly_box_time'>Now</p>
                                        <img src={clearCloudy} alt="weather icon"/>
                                        <p className='today_forecast_hourly_box_temp'>14&deg;</p>
                                    </div>
                                    <div className='today_forecast_hourly_box_normal'>
                                        <p className='today_forecast_hourly_box_time_nom'>01PM</p>
                                        <img src={clearCloudy} alt="weather icon"/>
                                        <p className='today_forecast_hourly_box_temp_nom'>16&deg;</p>
                                    </div>
                                    <div className='today_forecast_hourly_box_normal'>
                                        <p className='today_forecast_hourly_box_time_nom'>02PM</p>
                                        <img src={clearCloudy} alt="weather icon"/>
                                        <p className='today_forecast_hourly_box_temp_nom'>15&deg;</p>
                                    </div>
                                    <div className='today_forecast_hourly_box_normal'>
                                        <p className='today_forecast_hourly_box_time_nom'>03PM</p>
                                        <img src={clearCloudy} alt="weather icon"/>
                                        <p className='today_forecast_hourly_box_temp_nom'>15&deg;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='today_forecast_weekly'>
                            <Weekly />
                            <Weekly />
                            <Weekly />
                            <Weekly />
                            <Weekly />
                            <Weekly />
                            <Weekly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;