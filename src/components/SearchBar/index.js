import { useState, useEffect } from 'react';
import './styles.css';

const SearchBar = ({
    posts,
    setPosts
}) => {

    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {

    }, [])

    const handleSearch = (e) => {
        const filteredPosts = posts.filter((post) => {
            return (post.title.includes(e.target.value));
        });
        setPosts(filteredPosts);

    }

    return (
        <div className='search-bar-container'>
            <input className='search-bar' onChange={handleSearch} type="text" placeholder="Search"></input>
        </div>
    );

}

export default SearchBar;