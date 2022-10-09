import SearchBox from '../../Components/SearchBox/SearchBox';
import Weekly from '../../Components/Weekly/Weekly';
import night from '../../Assets/night.svg';
import './Dashboard.css'
import { useEffect, useState } from 'react';
import Choose from '../../Components/Choose/Choose';
import Stat from '../../Components/Stats/Stat';
import HourlyBox from '../../Components/HourlyBox/HourlyBox';

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

//videos
import clearNight from '../../Assets/Videos/clearNight.mp4'
import clearNightPoster from '../../Assets/Videos/clearNightPoster.png'
import clearDay from '../../Assets/Videos/clearDay.mp4'
import clearDayPoster from '../../Assets/Videos/clearDayPoster.png'
import rainyNight from '../../Assets/Videos/rainyNight.mp4'
import rainyNightPoster from '../../Assets/Videos/rainyNightPoster.png'
import rainyDay from '../../Assets/Videos/rainyDay.mp4'
import rainyDayPoster from '../../Assets/Videos/rainyDayPoster.png'
import snowyDay from '../../Assets/Videos/snowyDay.mp4'
import snowyDayPoster from '../../Assets/Videos/snowyDayPoster.png'
import snowyNight from '../../Assets/Videos/snowyNight.mp4'
import snowyNightPoster from '../../Assets/Videos/snowyNightPoster.png'
import thunderstormNight from '../../Assets/Videos/thunderstormNight.mp4'
import thunderstormNightPoster from '../../Assets/Videos/thunderstormNightPoster.png'


const Dashboard = ({ setTheme }) => {

    const [searchField, setSearchField] = useState('')
    const [query, setQuery] = useState('')
    const [geo, setGeo] = useState([])
    const [choose, setChoose] = useState(false)
    const [unit, setUnit] = useState('metric')
    const [currentWeather, SetCurrentWeather] = useState({})
    const [currentWeatherType, SetCurrentWeatherType] = useState({})
    const [lat_n_lon, SetLat_N_Lon] = useState([])

    const [currentCountry, SetCurrentCountry] = useState('')
    const [currentTime, SetCurrentTime] = useState('')
    const [currentTemp, SetCurrentTemp] = useState('')
    const [currentPressure, SetCurrentPressure] = useState('')
    const [currentWindSpeed, SetCurrentWindSpeed] = useState('')
    const [currentHumidity, SetCurrentHumidity] = useState('')
    const [currentUnits, SetCurrentUnits] = useState([])
    const [timeToSunRise, SetTimeToSunRise] = useState('')
    const [timeToSunSet, SetTimeToSunSet] = useState('')
    const [timeOfDay, SetTimeOfDay] = useState('')
    const [population, SetPopulation] = useState('')
    const [morningTemp, SetMorningTemp] = useState('')
    const [afternoonTemp, SetAfternoonTemp] = useState('')
    const [eveningTemp, SetEveningTemp] = useState('')
    const [nightTemp, SetNightTemp] = useState('')
    const [forcastDaily, SetForcastDaily] = useState({})
    const [forcastForTheWeek, SetForcastForTheWeek] = useState([])
    const [forcastWeatherHours, SetForcastWeatherHours] = useState({})
    const [forcastWeatherThreeHours, SetForcastWeatherThreeHours] = useState([])
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState('')
    const [currentWeatherVideo, setCurrentWeatherVideo] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingsec, setLoadingsec] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    
    //local variables to pass to state
    let currentWeatherCountry;
    let currentWeatherTime;
    let currentWeatherTemp;
    let currentWeatherPressure;
    let currentWeatherWindSpeed;
    let currentWeatherHumidity;
    let currentWeatherTimeZone;
    let AM_or_PM; 
    let windDirection; 
    let humidityDegree; 
    let humidityLevel;  
    let pressureDegree; 
    let pressureLevel;  
    let currentWeatherImage

    // units
    let TempUnit 
    let windSpeedUnit 
    

    let key = '7cdde76b930c2cf6be0b92a377a351f1'
    let url = 'https://api.openweathermap.org/'
    function handleSearchChange(e){
        // console.log(e.target.value)
    }

    useEffect(() => {
        // handleSeachClick()
        getUnit()
        getCurrentWeather(lat_n_lon[0], lat_n_lon[1], unit)
        // console.log('refresh')
        // console.log('query: ', query)
        // console.log('Geo: ', geo)
    },[geo,unit,lat_n_lon,timeOfDay])

    const handleSeachClick = (e) => {
        let searchbox = document.getElementById('search');
        let searchboxvalue = searchbox.value;
        
        setQuery(searchboxvalue)

        // fetching Geolocation
        const getGeolocation = async function(){
            try{
                setLoading(true)
                setLoadingsec(true)
                const rawGeo = await fetch(`${url}geo/1.0/direct?q=${searchboxvalue}&limit=3&appid=${key}`)
                console.log('fetch')
                searchboxvalue = ''
                const processedRawGeo = await rawGeo.json()
                console.log('ddd', processedRawGeo)
                setLoading(false)
                
                // console.log('processedRawGeo: ', processedRawGeo.length)
                if (processedRawGeo.length > 1){

                    //assign id to each object
                    const processedRawGeoWID = processedRawGeo.map((olocation , i) => {
                        return Object.assign(olocation, {id: i});
                    })
                    setGeo(processedRawGeoWID)
                    setChoose(true)
                    // geoArray = geoArray.concat(processedRawGeo)
                    // console.log(`lat: ${lat}, lon: ${lon}`)
                    // console.log(`geoArray: ${geo}`)
    
                }else if(processedRawGeo.length === 1){
                    
                    setGeo(processedRawGeo[0])
                    setChoose(false)
                    SetLat_N_Lon([processedRawGeo[0].lat, processedRawGeo[0].lon])
                    getCurrentWeather(processedRawGeo[0].lat, processedRawGeo[0].lon, unit)
                    
                }
            }catch (err){
                if (err.message === `Cannot read properties of null (reading 'style')`){
                }else{
                    setError(true)
                    setErrorMessage(err.message)
                    setLoading(false)
                    setLoadingsec(false)
                }
            }
                
        }
        getGeolocation()
        
    }

    const getId = (id) => {
        // return id;
        setLoadingsec(true)
        let presentChoice = geo[id]
        SetLat_N_Lon([presentChoice.lat, presentChoice.lon])
        getCurrentWeather(presentChoice.lat, presentChoice.lon, unit)
        setChoose(false)
        setLoadingsec(false)
        // console.log(presentChoice)
    }

    const getCurrentWeather = async function(lat, lon, unit){
        
        if (lat.length === 0 || lon.length === 0){
            alert('no co-ordinates')
            setError(true)
            setErrorMessage('Couldnt get Co-ordinates')
        }else{

            try{
                setLoading(true)
                setLoadingsec(true)
                const rawCurWeather = await fetch(`${url}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`)
                console.log('fetching')
                const processedRawCurWeather = await rawCurWeather.json()
                setLoading(false)
                setLoadingsec(false)
                SetCurrentWeather(processedRawCurWeather)
                currentWeatherTime = processedRawCurWeather.dt;
                currentWeatherTimeZone = processedRawCurWeather.timezone;
                let totalcurrentWeatherTime = currentWeatherTime + currentWeatherTimeZone
                let totalsunrise = processedRawCurWeather.sys.sunrise + currentWeatherTimeZone
                let totalsunset = processedRawCurWeather.sys.sunset + currentWeatherTimeZone
                SetCurrentTime(covertTimeToUTC(totalcurrentWeatherTime))
                console.log('totalcurrentWeatherTime ',totalcurrentWeatherTime)
                console.log('sunrise unix ',totalsunrise)
                console.log('sunset unit ',totalsunset)
                SetTimeToSunRise(covertTimeToUTC(totalsunrise))
                SetTimeToSunSet(covertTimeToUTC(totalsunset))
                Checktimeofday(totalcurrentWeatherTime, totalsunrise, totalsunset)
                getForcastWeatherThreeHours(lat, lon, unit)
                getForcastWeatherDaily(lat, lon, unit)
                // getPrevForcastWeatherPerHour(lat, lon, totalsunrise, totalsunset)
        
                currentWeatherCountry = processedRawCurWeather.sys.country
                SetCurrentWeatherType(processedRawCurWeather.weather[0])
                currentWeatherTemp = processedRawCurWeather.main.temp
                currentWeatherPressure = processedRawCurWeather.main.pressure
                currentWeatherWindSpeed = processedRawCurWeather.wind.speed
                currentWeatherHumidity = processedRawCurWeather.main.humidity
                shorten_chain(currentWeatherCountry, currentWeatherTemp, currentWeatherPressure, currentWeatherWindSpeed, currentWeatherHumidity)
                handleWindDirectionMeter(processedRawCurWeather.wind.deg)
                handleHumidityMeter(processedRawCurWeather.main.humidity)
                handlePressureMeter(processedRawCurWeather.main.pressure)
                // currentWeatherImage = changeWeatherImg(timeOfDay, processedRawCurWeather.weather[0].main, processedRawCurWeather.weather[0].description )
                // setCurrentWeatherIcon(currentWeatherImage)
                // console.log('timeOfDay: ', timeOfDay)
                // console.log('main: ', processedRawCurWeather.weather[0].main)
                // console.log('des: ', processedRawCurWeather.weather[0].description)
                // console.log('currentWeatherImage: ', currentWeatherImage)

            } catch (err){
                console.log({err})
                if (err.message === `Cannot read properties of null (reading 'style')`){
                }else{
                    setError(true)
                    setErrorMessage(err.message)
                    setLoading(false)
                    setLoadingsec(false)
                }
            }
        }
        

    }

    const getForcastWeatherThreeHours = async function(lat, lon, unit){
        if (lat.length === 0 || lon.length === 0){
            setError(true)
            setErrorMessage('Couldnt get Co-ordinates')
        }else{
            try{
                const rawForWeather = await fetch(`${url}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}&cnt=${4}`)
                // console.log('fetching')
                const processedRawForWeather = await rawForWeather.json()
                SetPopulation(processedRawForWeather.city.population)
                SetForcastWeatherHours(processedRawForWeather)
                let processedRawForWeatherList = processedRawForWeather.list
                console.log('forcast3hrs: ', processedRawForWeather)
                console.log('forcast3hrsList: ', processedRawForWeatherList)
                console.log('forcast3hrsConverted: ', covertTimeToUTC(processedRawForWeatherList[0].dt))
                
                //assign id to each object
                const processedRawForWeatherListID = processedRawForWeatherList.map((forcast , i) => {
                    return Object.assign(forcast, {id: i});
                })
    
                SetForcastWeatherThreeHours(processedRawForWeatherListID);
            }catch(err){
                if (err.message === `Cannot read properties of null (reading 'style')`){
                }else{
                    setError(true)
                    setErrorMessage(err.message)
                    setLoading(false)
                    setLoadingsec(false)
                }
            }
        }
    }

    const getForcastWeatherDaily = async function(lat, lon, unit){
        if (lat.length === 0 || lon.length === 0){
            setError(true)
            setErrorMessage('Couldnt get Co-ordinates')
        }else{
            try{
                const rawForWeatherDaily = await fetch(`${url}data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${key}&units=${unit}`)
    
                // console.log('fetching')
                const processedRawFurWeatherDaily = await rawForWeatherDaily.json()
                let morning = processedRawFurWeatherDaily.list[0].temp.morn.toFixed(0)
                let afternoon = processedRawFurWeatherDaily.list[0].temp.day.toFixed(0)
                let evening = processedRawFurWeatherDaily.list[0].temp.night.toFixed(0)
                let night = processedRawFurWeatherDaily.list[0].temp.eve.toFixed(0)
                SetMorningTemp(morning)
                SetAfternoonTemp(afternoon)
                SetEveningTemp(evening)
                SetNightTemp(night)
                SetForcastDaily(processedRawFurWeatherDaily)
                let slopeVars = []
                slopeVars.push(Number(morning))
                slopeVars.push(Number(afternoon))
                slopeVars.push(Number(evening))
                slopeVars.push(Number(night))
                alignslope(slopeVars, slopeVars) 
                let processeddailylist = processedRawFurWeatherDaily.list
                const finalProcessedDailyList = processeddailylist.map((day , i) => {
                    return Object.assign(day, {id: i});
                })
                SetForcastForTheWeek(finalProcessedDailyList)
                console.log('Forcast Daily: ', processedRawFurWeatherDaily)
                // SetDailyTemp([morning, afternoon, evening, night])
            }catch(err){
                if (err.message === `Cannot read properties of null (reading 'style')`){
                }else{
                    setError(true)
                    setErrorMessage(err.message)
                    setLoading(false)
                    setLoadingsec(false)
                }
            }

        }
    }

    //doent work cause i didnt pay lol.. sapa nice one
    // const getPrevForcastWeatherPerHour = async function(lat, lon, start, end, cnt){
    //     if (lat.length === 0 || lon.length === 0){
    //         alert('no co-ordinates')
    //     }else{
    //         const rawPFWeatherPerHour = await fetch(`${url}data/2.5/history/city?=${lat}&lon=${lon}&appid=${key}&type=hour&start=${start}&cnt=${24}`)
    //         // console.log('fetching')
    //         const processedRawPrevFurWeatherPerHour = await rawPFWeatherPerHour.json()
    //         console.log('prevforcast: ', processedRawPrevFurWeatherPerHour)
            
    //     }
    // }

    const getUnit = () => {
        if (unit === 'metric'){

            TempUnit = String.fromCodePoint(parseInt(2103,16));
            windSpeedUnit = 'm/s'

        }else if (unit === 'imperial'){

            TempUnit = String.fromCodePoint(parseInt(2109,16));
            windSpeedUnit = 'Mi/h'
            
        }else if (unit === 'default'){

            TempUnit = 'K'
            windSpeedUnit = 'Km/h'

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

        return `${hours}:${minutes}${AM_or_PM}`
        // SetCurrentTime(`${hours}:${minutes}${AM_or_PM}`) 
    }

    //get the day of forecast for each day of the week
    const getTheDay = (timestamp) => {

        var date = new Date(timestamp * 1000);
        var month = date.getMonth() + 1;
        var day = date.getDay();
        var caldate = date.getDate();
        var year = date.getFullYear();
        let dayInEnglish
        let monthInEnglish

        if (day === 0){
            dayInEnglish = 'Sunday' 
        }else if (day === 1){
            dayInEnglish = 'Monday'
        }else if (day === 2){
            dayInEnglish = 'Tuesday'
        }else if (day === 3){
            dayInEnglish = 'Wednesday'
        }else if (day === 4){
            dayInEnglish = 'Thursday'
        }else if (day === 5){
            dayInEnglish = 'Friday'
        }else if (day === 6){
            dayInEnglish = 'Saturday'
        }

        if (month === 1){
            monthInEnglish = 'Jan' 
        }else if (month === 2){
            monthInEnglish = 'Feb'
        }else if (month === 3){
            monthInEnglish = 'Mar'
        }else if (month === 4){
            monthInEnglish = 'Apr'
        }else if (month === 5){
            monthInEnglish = 'May'
        }else if (month === 6){
            monthInEnglish = 'Jun'
        }else if (month === 7){
            monthInEnglish = 'Jul'
        }else if (month === 8){
            monthInEnglish = 'Aug'
        }else if (month === 9){
            monthInEnglish = 'Sep'
        }else if (month === 10){
            monthInEnglish = 'Oct'
        }else if (month === 11){
            monthInEnglish = 'Nov'
        }else if (month === 12){
            monthInEnglish = 'Dec'
        }



        let formattedTimeArray = [];
        formattedTimeArray.push(dayInEnglish)
        formattedTimeArray.push(monthInEnglish)
        formattedTimeArray.push(caldate)
        formattedTimeArray.push(year)
        return formattedTimeArray;

    }

    //function to shorten chains due to not been able to pass directly
    //also shortens the temp
    const shorten_chain = (country, temp, pres, wind, humidity) => {
        SetCurrentCountry(country)
        temp = temp.toFixed(0)
        SetCurrentTemp(temp) 
        SetCurrentPressure(pres) 

        //convert wind speed if Unit is default
        if (unit === 'default'){
            wind = wind * 3.6
        }

        SetCurrentWindSpeed(wind)
        SetCurrentHumidity(humidity)
    }

    //function to check and set time of day
    const Checktimeofday = (CurrentTimeUnix, sunriseunix, sunsetunix) =>{

        console.log('checking time of day')
        let sunrisediff = sunriseunix - CurrentTimeUnix;
        let sunsetdiff = sunsetunix - CurrentTimeUnix;

        if (sunriseunix < CurrentTimeUnix && sunsetunix > CurrentTimeUnix){
            SetTimeOfDay('day')
            setTheme('day')
        }else if (sunriseunix > CurrentTimeUnix && sunsetunix < CurrentTimeUnix){
            SetTimeOfDay('night')
            setTheme('night')
        }else if (sunriseunix > CurrentTimeUnix && sunsetunix > CurrentTimeUnix){

            if (sunrisediff < sunsetdiff){
                SetTimeOfDay('night')
                setTheme('night')
            }else{
                SetTimeOfDay('day')
                setTheme('day')
            }
        }else if (sunriseunix < CurrentTimeUnix && sunsetunix < CurrentTimeUnix){

            if (sunrisediff < sunsetdiff){
                SetTimeOfDay('night')
                setTheme('night')
            }else{
                SetTimeOfDay('day')
                setTheme('day')
            }
        }

    }

    //funstion to change unit on click
    const handleUnitButtonClick = () => {
        const unit_change_button = document.getElementById('unit_button_option')

        if (unit_change_button.classList.contains('active')){
            unit_change_button.classList.remove('active')
            setUnit('metric')
            
        }else{
            unit_change_button.classList.add('active')
            setUnit('imperial')
        }
    }

    const handleWindDirectionMeter = (deg) => {
        windDirection = deg - 45
        let windDirectionMeter = document.getElementById('wind_meter_guage')
        windDirectionMeter.style.transform = `rotate(${windDirection}deg)`;
    }

    const handleHumidityMeter = (deg) => {
        humidityDegree = deg
        humidityLevel = 3.6 * deg
        let HumidityMeter = document.getElementById('humidity_level_loading')
        HumidityMeter.style.background = `conic-gradient(rgb(78, 76, 201), rgb(23, 217, 72), rgb(214, 218, 11), rgb(201, 148, 4), rgb(240, 7, 7) ${humidityLevel}deg, var(--weekly-overlay) 0deg)`;
    }

    const handlePressureMeter = (deg) => {
        pressureDegree = deg
        pressureLevel = 0.135 * deg
        let pressureMeter = document.getElementById('pressure_guage')
        pressureMeter.style.transform = `rotate(${pressureLevel}deg)`;
    }
    
    //function to align temperature scale
    const alignslope = (dailyTempToBeSorted) => {
        let dailyarray = []
        dailyarray.push(dailyTempToBeSorted[0])
        dailyarray.push(dailyTempToBeSorted[1])
        dailyarray.push(dailyTempToBeSorted[2])
        dailyarray.push(dailyTempToBeSorted[3])
        let dailyarraysorting = dailyTempToBeSorted
        dailyarraysorting.sort((a, b) => (a - b));
        const highestdailytemp = dailyarraysorting[3]
        const lowestdailytemp = dailyarraysorting[0]

        let diffHighesttemp_n_Lowesttemp = highestdailytemp - lowestdailytemp

        if (diffHighesttemp_n_Lowesttemp < 3){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 3 && diffHighesttemp_n_Lowesttemp < 5){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 2  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 5 && diffHighesttemp_n_Lowesttemp < 10){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 20  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 10 && diffHighesttemp_n_Lowesttemp < 15){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 40  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 15 && diffHighesttemp_n_Lowesttemp < 20){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 60  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 20 && diffHighesttemp_n_Lowesttemp < 25){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 80  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 25 && diffHighesttemp_n_Lowesttemp < 30){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 100  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 30 && diffHighesttemp_n_Lowesttemp < 35){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 120  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 35 && diffHighesttemp_n_Lowesttemp < 40){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 140 //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 40 && diffHighesttemp_n_Lowesttemp < 45){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 180  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 45 && diffHighesttemp_n_Lowesttemp < 50){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 200  //share the slope to sections
        }else if(diffHighesttemp_n_Lowesttemp >= 50 && diffHighesttemp_n_Lowesttemp < 55){
            diffHighesttemp_n_Lowesttemp = diffHighesttemp_n_Lowesttemp / 220  //share the slope to sections
        }

        // console.log('dailyarray: ', dailyarray)
        // console.log('dailyarraysorting: ', dailyarraysorting)
        // console.log('diffHighesttemp_n_Lowesttemp: ', diffHighesttemp_n_Lowesttemp)

        let generalLowestPoint = 3 
        
        let levelfirstArray = dailyarray.map((degree, i) => {
            return degree - lowestdailytemp
        })
        let levelsecondArray = levelfirstArray.map((degree, i) => {
            return degree * diffHighesttemp_n_Lowesttemp
        })
        let settingLevels = levelsecondArray.map((degree, i) => {
            return degree - generalLowestPoint
        })
        // console.log('levelArray: ', settingLevels)
        
        let morningTempLevel = settingLevels[0]
        let afternoonTempLevel = settingLevels[1]
        let eveningTempLevel = settingLevels[2]
        let nightTempLevel = settingLevels[3]

        
        let morningPoint = document.getElementById('morning')
        let afternoonPoint = document.getElementById('afternoon')
        let eveningPoint = document.getElementById('evening')
        let nightPoint = document.getElementById('night')

        morningPoint.style.bottom = `${morningTempLevel}rem`
        afternoonPoint.style.bottom = `${afternoonTempLevel}rem`
        eveningPoint.style.bottom = `${eveningTempLevel}rem`
        nightPoint.style.bottom = `${nightTempLevel}rem`

    }

    //check for weather type and change icon base on that
    
    const changeWeatherVideo = (timeOfDay, weather) => {

        let weatherVideo
        let WeatherBackground = document.getElementById('weather_board')

        if (weather === 'Rain'){

            if (timeOfDay === 'day'){

                weatherVideo = rainyDay
                
            }else if(timeOfDay === 'night'){

                weatherVideo = rainyNight

            }

        }else if(weather === 'Thunderstorm'){

            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

                weatherVideo = thunderstormNight
            }

        }else if(weather === 'Drizzle'){
            
            if (timeOfDay === 'day'){

                weatherVideo = rainyDay
                
            }else if(timeOfDay === 'night'){

                weatherVideo = rainyNight
            }

        }else if(weather === 'Snow'){
            
            if (timeOfDay === 'day'){

                weatherVideo = snowyDay
                
            }else if(timeOfDay === 'night'){

                weatherVideo = snowyNight

            }

        }else if(weather === 'Clear'){
            
            if (timeOfDay === 'day'){

                weatherVideo = clearDay
                
            }else if(timeOfDay === 'night'){

                weatherVideo = clearNight

            }

        }else if(weather === 'Clouds'){
            
            if (timeOfDay === 'day'){

                weatherVideo = clearDay
                
            }else if(timeOfDay === 'night'){

                weatherVideo = clearNight
            }


        }else if(weather === 'Mist'){
            
            if (timeOfDay === 'day'){

            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Smoke'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Haze'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Dust'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){
                
            }

        }else if(weather === 'Fog'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Sand'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Ash'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Squall'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Tornado'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){
                
            }

        }

        return weatherVideo

    }

    const changeWeatherImg = (timeOfDay, weather, des) => {

        let weathericon
        let WeatherBackground = document.getElementById('weather_board')

        if (weather === 'Rain'){
            // change video to rain 
            // WeatherBackground.style.background = ''

            if (timeOfDay === 'day'){

                if (des === 'light rain'){
                    
                }else if(des === 'moderate rain'){
                    
                }else if(des === 'heavy intensity rain'){
                    
                }else if(des === 'very heavy rain'){
                    
                }else if(des === 'extreme rain'){
                    
                }else if(des === 'freezing rain'){
                    
                }else if(des === 'light intensity shower rain'){
                    
                }else if(des === 'shower rain'){
                    
                }else if(des === 'heavy intensity shower rain'){
                    
                }else if(des === 'ragged shower rain'){
                    
                }

                weathericon = <img alt='weather icon' src={drizzle} />
                
                
            }else if(timeOfDay === 'night'){

                if (des === 'light rain'){
                    
                }else if(des === 'moderate rain'){
                    
                }else if(des === 'heavy intensity rain'){

                }else if(des === 'very heavy rain'){

                }else if(des === 'extreme rain'){

                }else if(des === 'freezing rain'){

                }else if(des === 'light intensity shower rain'){

                }else if(des === 'shower rain'){

                }else if(des === 'heavy intensity shower rain'){

                }else if(des === 'ragged shower rain'){

                }

                weathericon = <img alt='weather icon' src={drizzleNight} />

            }

            

        }else if(weather === 'Thunderstorm'){

            if (timeOfDay === 'day'){

                if (des === 'thunderstorm with light rain'){
                    weathericon = <img alt='weather icon' src={thunderstroms} />
                }else if(des === 'thunderstorm with rain'){
                    weathericon = <img alt='weather icon' src={thunderstroms} />
                }else if(des === 'thunderstorm with heavy rain'){
                    weathericon = <img alt='weather icon' src={thunderstroms} />
                }else if(des === 'light thunderstorm'){
                    weathericon = <img alt='weather icon' src={stormy} />
                }else if(des === 'thunderstorm'){
                    weathericon = <img alt='weather icon' src={lightning} />
                }else if(des === 'heavy thunderstorm'){
                    weathericon = <img alt='weather icon' src={lightning} />
                }else if(des === 'ragged thunderstorm'){
                    weathericon = <img alt='weather icon' src={lightning} />
                }else if(des === 'thunderstorm with light drizzle'){
                    weathericon = <img alt='weather icon' src={thunderstroms} />
                }else if(des === 'thunderstorm with drizzle'){
                    weathericon = <img alt='weather icon' src={thunderstroms} />
                }else if(des === 'thunderstorm with heavy drizzle'){
                    weathericon = <img alt='weather icon' src={thunderstroms} />
                }

                
                
            }else if(timeOfDay === 'night'){

                if (des === 'thunderstorm with light rain'){
                    weathericon = <img alt='weather icon' src={thunderstromsSunnyNight} />
                }else if(des === 'thunderstorm with rain'){
                    weathericon = <img alt='weather icon' src={thunderstromsSunnyNight} />
                }else if(des === 'thunderstorm with heavy rain'){
                    weathericon = <img alt='weather icon' src={thunderstromsSunnyNight} />
                }else if(des === 'light thunderstorm'){
                    weathericon = <img alt='weather icon' src={stormy} />
                }else if(des === 'thunderstorm'){
                    weathericon = <img alt='weather icon' src={lightning} />
                }else if(des === 'heavy thunderstorm'){
                    weathericon = <img alt='weather icon' src={lightning} />
                }else if(des === 'ragged thunderstorm'){
                    weathericon = <img alt='weather icon' src={lightning} />
                }else if(des === 'thunderstorm with light drizzle'){
                    weathericon = <img alt='weather icon' src={thunderstromsSunnyNight} />
                }else if(des === 'thunderstorm with drizzle'){
                    weathericon = <img alt='weather icon' src={thunderstromsSunnyNight} />
                }else if(des === 'thunderstorm with heavy drizzle'){
                    weathericon = <img alt='weather icon' src={thunderstromsSunnyNight} />
                }

            }

            

        }else if(weather === 'Drizzle'){
            
            if (timeOfDay === 'day'){

                if (des === 'light intensity drizzle'){
                    
                }else if(des === 'drizzle'){
                    
                }else if(des === 'heavy intensity drizzle'){
                    
                }else if(des === 'light intensity drizzle rain'){
                    
                }else if(des === 'drizzle rain'){
                    
                }else if(des === 'heavy intensity drizzle rain'){
                    
                }else if(des === 'shower rain and drizzle'){
                    
                }else if(des === 'heavy shower rain and drizzle'){

                }else if(des === 'shower drizzle'){

                }

                weathericon = <img alt='weather icon' src={drizzleSunny} />
                
            }else if(timeOfDay === 'night'){

                if (des === 'light intensity drizzle'){
                    
                }else if(des === 'drizzle'){
                    
                }else if(des === 'heavy intensity drizzle'){
                    
                }else if(des === 'light intensity drizzle rain'){
                    
                }else if(des === 'drizzle rain'){
                    
                }else if(des === 'heavy intensity drizzle rain'){
                    
                }else if(des === 'shower rain and drizzle'){
                    
                }else if(des === 'heavy shower rain and drizzle'){

                }else if(des === 'shower drizzle'){

                }

                weathericon = <img alt='weather icon' src={drizzleNight} />
                // setCurrentWeatherVideo([rainyNight , rainyNightPoster])
            }

            

        }else if(weather === 'Snow'){
            
            if (timeOfDay === 'day'){

                if (des === 'light snow'){
                    weathericon = <img alt='weather icon' src={snowFlurries} />
                }else if(des === 'drizzle'){
                    weathericon = <img alt='weather icon' src={snowFlurries} />
                }else if(des === 'snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }else if(des === 'heavy snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }else if(des === 'sleet'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'light shower sleet'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'shower sleet'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'light rain and snow'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'rain and snow'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'light shower snow'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'shower snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }else if(des === 'heavy shower snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }
                
            }else if(timeOfDay === 'night'){

                if (des === 'light snow'){
                    weathericon = <img alt='weather icon' src={snowFlurries} />
                }else if(des === 'drizzle'){
                    weathericon = <img alt='weather icon' src={snowFlurries} />
                }else if(des === 'snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }else if(des === 'heavy snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }else if(des === 'sleet'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'light shower sleet'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'shower sleet'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'light rain and snow'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'rain and snow'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'light shower snow'){
                    weathericon = <img alt='weather icon' src={sleet} />
                }else if(des === 'shower snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }else if(des === 'heavy shower snow'){
                    weathericon = <img alt='weather icon' src={snow} />
                }

            }

            

        }else if(weather === 'Clear'){
            
            if (timeOfDay === 'day'){

                if (des === 'clear sky'){
                    weathericon = <img alt='weather icon' src={clearCloudy} />
                }else if (des === 'sky is clear'){
                    weathericon = <img alt='weather icon' src={clearCloudy} />
                }

                weathericon = <img alt='weather icon' src={clearCloudy} />
                // setCurrentWeatherVideo([clearDay , clearDayPoster])
                
            }else if(timeOfDay === 'night'){

                if (des === 'clear sky'){
                    weathericon = <img alt='weather icon' src={clearCloudyNight} />
                }

                weathericon = <img alt='weather icon' src={clearCloudy} />
                // setCurrentWeatherVideo([clearNight , clearNightPoster])

            }

            

        }else if(weather === 'Clouds'){
            
            if (timeOfDay === 'day'){

                if (des === 'few clouds'){
                    // weathericon = 'cloudy'
                    weathericon = <img alt='weather icon' src={cloudy}  />
                }else if(des === 'scattered clouds'){
                    weathericon = <img alt='weather icon' src={cloudy}  />
                }else if(des === 'broken clouds'){
                    weathericon = <img alt='weather icon' src={partlyCloudy}  />
                }else if(des === 'overcast clouds'){
                    weathericon = <img alt='weather icon' src={partlyCloudy}  />
                }else{
                    weathericon = <img alt='weather icon' src={partlyCloudy}  />
                }

                // setCurrentWeatherVideo([clearDay , clearDayPoster])
                
            }else if(timeOfDay === 'night'){

                if (des === 'few clouds'){
                    weathericon = <img alt='weather icon' src={mostlyCloudyNight}  />
                }else if(des === 'scattered clouds'){
                    weathericon = <img alt='weather icon' src={mostlyCloudyNight}  />
                }else if(des === 'broken clouds'){
                    weathericon = <img alt='weather icon' src={mostlyCloudyNight}  />
                }else if(des === 'overcast clouds'){
                    weathericon = <img alt='weather icon' src={mostlyCloudyNight}  />
                }else{
                    weathericon = <img alt='weather icon' src={partlyCloudy}  />
                }

                // setCurrentWeatherVideo([clearNightPoster , clearNightPoster])
            }

            

        }else if(weather === 'Mist'){
            
            if (timeOfDay === 'day'){

            }else if(timeOfDay === 'night'){

            }

            weathericon = <img alt='weather icon' src={fog} />
            

        }else if(weather === 'Smoke'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Haze'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Dust'){
            
            if (timeOfDay === 'day'){
                weathericon = <img alt='weather icon' src={windy} />
            }else if(timeOfDay === 'night'){
                weathericon = <img alt='weather icon' src={windy} />
            }

            

        }else if(weather === 'Fog'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

            weathericon = <img alt='weather icon' src={fog} />
            

        }else if(weather === 'Sand'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Ash'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Squall'){
            
            if (timeOfDay === 'day'){
                
            }else if(timeOfDay === 'night'){

            }

        }else if(weather === 'Tornado'){
            
            if (timeOfDay === 'day'){
                weathericon = <img alt='weather icon' src={tornado} />
            }else if(timeOfDay === 'night'){
                weathericon = <img alt='weather icon' src={tornado} />
            }

            

        }

        return weathericon

    }

    const cancelErrorbox = () => {
        let errorbox = document.querySelector('.error_box').classList.remove('reveal')
        errorbox.classList.remove('reveal')
        setError(false)
        setLoading(false)
    }

    const setVideoLoaded = () => {

    }

    // const setTheme = () => {
    //     if (){
            
    //     }
    // }
    

    let weatherDisplayVideo = changeWeatherVideo(timeOfDay, currentWeatherType.main)
    console.log('weatherDisplayVideo', weatherDisplayVideo)


    return(
        <div className='dashboard'>
            <div className='dashboard_container'>
                <div className='dashboard_firstpart'>

                    <div className={ error ? 'error_box reveal' : 'error_box'}>
                        <div className={ error ? 'error_box_cotent reveal' : 'error_box_cotent'}>
                            <i id='error_cancel' class="fa fa-times-circle" aria-hidden="true" onClick={cancelErrorbox}></i>
                            <h1>Error!!!</h1>
                            <p>{errorMessage}</p>
                        </div>
                    </div>

                    <div className='dashboard_firstpart_top'>
                        <SearchBox handleSearchChange={handleSearchChange} handleSeachClick={handleSeachClick} />
                        <div className='dashboard_firstpart_top_other_buttons' >
                            <div className='unit_button' onClick={handleUnitButtonClick}>
                                <p className='unit_base_option'>{String.fromCodePoint(parseInt(2103,16))}</p>
                                <p className='unit_base_option'>{String.fromCodePoint(parseInt(2109,16))}</p>
                                <div id='unit_button_option' className='unit_button_option'>
                                    <p>{currentUnits[0]}</p>
                                </div>
                            </div>
                            <div className='sunrise_sunset'>
                                { timeOfDay === "night" ?
                                    <div className='time_to_sunriseOrset'>
                                    <img src={clearCloudy} alt='day' />
                                    <p>in</p>
                                    <p>{timeToSunRise}</p>
                                    </div>
                                : 
                                timeOfDay === "day" ?
                                    
                                    <div className='time_to_sunriseOrset'>
                                    <img src={night} alt='night' />
                                    <p>in</p>
                                    <p>{timeToSunSet}</p>
                                    </div>
                                :
                                    <div className='time_to_sunriseOrset'>
                                    </div>
                                    
                                }
                            </div>
                            <div className='notification_button'>
                                <i class="fa fa-bell-o" aria-hidden="true"><div className='notify'></div></i>
                            </div>
                            <div className='Profile_button'>
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>

                    

                    {

                    loading ? 
                    
                    <div className='loading_page'>
                        <i class="fa fa-snowflake-o" aria-hidden="true"></i>
                        <p>Loading</p>
                        <div className='loading_text'>
                            <span></span>
                        </div>
                    </div>
                    
                    :
                    /* show choose if queries are more than 1 */
                        
                    
                    choose ?

                    <div className='choose_dash'>
                        <p className='choose_dash_abeg'>We found a few Locations, Agba Help Us Out.</p>
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
                    </div>

                    :

                    <div className='dashboard_firstpart_rest'>
                        <div id='weather_board' className='dashboard_firstpart_rest_top'>
                            <div className='video_container'>
                                <video
                                    autoPlay
                                    playsInline
                                    muted
                                    className="video"
                                    loop
                                    src={weatherDisplayVideo}
                                    // src = {`${video}`}
                                    // poster={weatherDisplayVideo[1]}
                                    onLoadedData={() => {
                                    setVideoLoaded();
                                    }}
                                />
                            </div>
                            <div className='display_board'>
                                <div className='display_board_details'>
                                    <div className='display_board_details_location_and_date'>
                                        <div className='display_board_details_location'>
                                            <div className='display_board_details_location_container'>
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                                <p>{`${currentWeather.name}, ${currentCountry}`}</p> 
                                            </div>
                                            <div className='display_board_details_population_container'>
                                                <i class="fa fa-users" aria-hidden="true"></i>
                                                <p className='population'>{population}</p> 
                                            </div>
                                        </div>
                                        <div className='display_board_details_date'>
                                            <p>Today {currentTime}</p> 
                                        </div>
                                    </div>

                                        <Stat currentTemp={currentTemp} currentWeather={currentWeather} currentWeatherType={currentWeatherType} currentUnits={currentUnits} changeWeatherImg={changeWeatherImg} timeOfDay={timeOfDay}/>
                                    
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
                                            <p className='smallp'>{currentPressure}hPa</p>
                                            
                                        </div>
                                        <div className='display_board_details_others_chance_rain'>
                                            <i class="fa fa-tint" aria-hidden="true"></i>
                                            <p className='smallp'>24%</p>
                                        </div>
                                        <div className='display_board_details_others_chance_rain'>
                                            <i class="fa fa-tint" aria-hidden="true"></i>
                                            <p className='smallp'>{currentHumidity}%</p>
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
                                                    <div id='morning' className='today_temp_unit_point morning'></div>
                                                </div>
                                                <div className='today_temp_unit_point_container'>
                                                    <div id='afternoon' className='today_temp_unit_point afternoon'></div>   
                                                </div>
                                                <div className='today_temp_unit_point_container'>
                                                    <div id='evening' className='today_temp_unit_point evening'></div>
                                                </div>
                                                <div className='today_temp_unit_point_container'>
                                                    <div id='night' className='today_temp_unit_point night'></div>
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
                                                <p className='today_temp_unit_temp'>{morningTemp}{currentUnits[0]}</p>
                                            </div>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Afternoon</p>
                                                <p className='today_temp_unit_temp'>{afternoonTemp}{currentUnits[0]}</p>
                                            </div>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Evening</p>
                                                <p className='today_temp_unit_temp'>{eveningTemp}{currentUnits[0]}</p>
                                            </div>
                                            <div className='today_temp_unit'>
                                                <p className='today_temp_unit_time'>Night</p>
                                                <p className='today_temp_unit_temp'>{nightTemp}{currentUnits[0]}</p>
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
                                        <p className='text_part_bold_text'>{`${currentWindSpeed} ${currentUnits[1]}`}</p>
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
                                            <svg id='wind_meter_guage' width="100%" height="20" viewBox="0 0 141 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                        <p className='text_part_light_text'>Today Wind Pressure</p>
                                        <p className='text_part_bold_text'>{currentPressure} hPa</p>
                                    </div>
                                    <div className='meter'>
                                        <div className=' no_border pressure_circle'>
                                            <div className='meter_circle_pressure_inner_circle_loading'>
                                            </div>
                                            <div className='meter_circle_rain_last_circle'>
                                            </div>
                                            <div id='pressure_guage' className='pressure_end_container'>
                                                <svg  width="3rem" height="3rem" viewBox="0 0 81 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 14L77 14" stroke="black" stroke-width="6"/>
                                                    {/* <circle cx="23" cy="14" r="8.5" fill="white" stroke="black" stroke-width="3"/> */}
                                                    <path d="M79 15L60 3.5" stroke="black" stroke-width="6"/>
                                                    <path d="M60 24L79 12.5" stroke="black" stroke-width="6"/>
                                                </svg>
                                            </div>
                                            <div className='meter_circle_pressure_last_circle'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='dashboard_firstpart_rest_buttom_right_box'>
                                    <div className='text_part'>
                                        <p className='text_part_bold_text'>Humidity</p>
                                        <p className='text_part_light_text'>Today humidity</p>
                                        <p className='text_part_bold_text'>{currentHumidity}%</p>
                                    </div>
                                    <div className='meter'>
                                        <div className='meter_circle no_border'>
                                            <div id='humidity_level_loading' className='meter_circle_uv_inner_circle_loading' >
                                            </div>
                                            <div className='meter_circle_uv_last_circle'>
                                                <p id='humity_level_title' className='humity_level_title'>{currentHumidity < 40 ? "Low" : currentHumidity > 40 && currentHumidity < 60 ? "Mid" : "High"}</p>
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

                    {
                    loadingsec ? 
                    
                    <div className='loading_page'>
                        <i class="fa fa-snowflake-o" aria-hidden="true"></i>
                        <p>Loading</p>
                        <div className='loading_text'>
                            <span></span>
                        </div>
                    </div>

                    :

                    <div>
                        <div className='today_forecast_hourly'>
                            <p className='today_forecast_hourly_title'>Today</p>
                            <div className='today_forecast_hourly_box_container'>
                                <div className='today_forecast_hourly_box_container_row'>
                                    {
                                        forcastWeatherThreeHours.map((forThreeHours, i) => {
                                            return (
                                            <HourlyBox 
                                            key={i}
                                            forThreeHours={forThreeHours}
                                            forcastWeatherHours={forcastWeatherHours}
                                            currentUnits = {currentUnits}
                                            covertTimeToUTC = {covertTimeToUTC}
                                            changeWeatherImg={changeWeatherImg} 
                                            timeOfDay={timeOfDay}
                                            />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='today_forecast_weekly'>
                            {
                                forcastForTheWeek.map((fortheday, i) => {
                                    return (
                                        <Weekly 
                                            key = {i}
                                            fortheday = {fortheday}
                                            forcastDaily = {forcastDaily}
                                            currentUnits = {currentUnits}
                                            getTheDay = {getTheDay}
                                            changeWeatherImg={changeWeatherImg} 
                                            timeOfDay={timeOfDay}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                    
                    }
                </div>
            </div>
        </div>
    );

}

export default Dashboard;