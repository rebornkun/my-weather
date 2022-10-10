import './Aside.css'


const Aside = () => {

    const handleNavBar = () => {
        let aside = document.querySelector('.aside')
        
        if(aside.classList.contains('active')){
            aside.classList.remove('active')
        }else{
            aside.classList.add('active')
        }
    }

    return(
        <div className='aside'>
            <div className='aside_container active'>
                <h1>Weather.co</h1>
                <div className='navitem_container'>
                    <ul>
                        <li className='navitem active'><i class="fa fa-th-large" aria-hidden="true"></i><p>Dashboard</p> <span></span></li>
                        <li className='navitem'><i class="fa fa-globe" aria-hidden="true"></i><p>Map</p>  <span></span></li>
                        <li className='navitem'><i class="fa fa-heart-o" aria-hidden="true"></i><p>Saved location</p> <span></span></li>
                        <li className='navitem'><i class="fa fa-calendar" aria-hidden="true"></i><p>Calendar</p> <span></span></li>
                    </ul>
                    <ul>
                        <li className='navitem'><i class="fa fa-sign-out" aria-hidden="true"></i><p>Sign out</p></li>
                    </ul>
                </div>
                <div className='aside_toggler' onClick={handleNavBar}>
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );

}

export default Aside;