import './SearchBox.css'


const SearchBox = ({handleSearchChange, handleSeachClick}) => {

    return(
        <div className='searchbox' >
            <div className='searchbox_container'>
                <input
                id='search' 
                type='text'
                placeholder='Search Something here....'
                spellCheck='true' 
                onChange={handleSearchChange}
                 />
                <div className='search_button' onClick={handleSeachClick}>
                <i class="fa fa-search" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );

}

export default SearchBox;