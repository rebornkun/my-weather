import './Aside.css'


const Aside = () => {

    return(
        <div className='aside'>
            <div className='aside_container'>
                <h1>Weather.co</h1>
                <div className='navitem_container'>
                    <ul>
                        <li className='navitem active'><i class="fa fa-th-large" aria-hidden="true"></i>Dashboard <span></span></li>
                        <li className='navitem'><i class="fa fa-globe" aria-hidden="true"></i>Map <span></span></li>
                        <li className='navitem'><i class="fa fa-heart-o" aria-hidden="true"></i>Saved location <span></span></li>
                        <li className='navitem'><i class="fa fa-calendar" aria-hidden="true"></i>Calendar <span></span></li>
                    </ul>
                    <ul>
                        <li className='navitem'><i class="fa fa-sign-out" aria-hidden="true"></i>Sign out</li>
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default Aside;