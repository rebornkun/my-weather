import './Choose.css'


const Choose = ({key,
                id,
                name,
                state,
                country,
                lat,
                lon,
                getId}) => {

    const handleclick = (e) =>{
        getId(id)
    }

    return(
        <div className='choose' onClick={handleclick}>
            <div className='choose_container'>
                <p className='name'>{name}</p>
                <p className='state'>{state}</p>
                <p className='country'>{country}</p>
                <div className='corodinates_container'>
                    <div className='corodinates_container_box'>
                        <p className='Lat'>Latff</p>
                        <p className='Lon'>Lon</p>
                    </div>
                    <div className='corodinates_container_box'>
                        <p className='Lat_value'>{lat}</p>
                        <p className='Lon_value'>{lon}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Choose;