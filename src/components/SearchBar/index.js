import './styles.css';

const SearchBar = ({
    setSearchValue
}) => {

  return (
    <div className='search-bar-container'>
      <input className='search-bar' onChange={(e)=>{setSearchValue(e.target.value)}} type="text" placeholder="Search"></input>
    </div>
  );

}

export default SearchBar;