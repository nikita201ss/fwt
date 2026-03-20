import React, { useState } from 'react';
import search_icon from '../style/static/icon/search_icon.svg';
import filter_icon from '../style/static/icon/filter_icon.svg';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    placeholder = 'Painting title',
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    return (
        <div className='search__bar'>
            <div className="search">
                <button className="search__button center" onClick={handleSearch}>
                    <img src={search_icon} alt="search" />
                </button>
                <input
                    type="text"
                    className="search__input"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className='filter center'>
                <button className="filter__button" onClick={handleSearch}>
                    <img src={filter_icon} alt="filter" />
                </button>
            </div>

        </div>
    );
};

export default SearchBar;