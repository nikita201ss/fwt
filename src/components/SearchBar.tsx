import React, { useState } from 'react';
import search_icon from '../style/static/icon/search_icon.svg';
import filter_icon from '../style/static/icon/filter_icon.svg';
import RightBar from './RightBar';
import type { FiltersState } from '../types/filters';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterChange?: (filters: FiltersState) => void;
    placeholder?: string;
    isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onFilterChange,
    placeholder = 'Painting title',
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isRightBarOpen, setIsRightBarOpen] = useState(false);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const toggleRightBar = () => {
        setIsRightBarOpen(!isRightBarOpen);
    };

    const closeRightBar = () => {
        setIsRightBarOpen(false);
    };

    const handleApplyFilters = (filters: FiltersState) => {
        console.log('Applying filters:', filters);
        if (onFilterChange) {
            onFilterChange(filters);
        }
    };

    return (
        <>
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
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>

                <div className='filter center'>
                    <button className="filter__button" onClick={toggleRightBar}>
                        <img src={filter_icon} alt="filter" />
                    </button>
                </div>
            </div>

            {isRightBarOpen && (
                <RightBar 
                    onClose={closeRightBar} 
                    onApplyFilters={handleApplyFilters}
                />
            )}
        </>
    );
};

export default SearchBar;