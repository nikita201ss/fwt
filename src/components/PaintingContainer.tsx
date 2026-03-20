// import React from 'react';
import { paintingAPI } from '../services/PaintingService';
import PaintingItem from './PaintingItem';
import SearchBar from './SearchBar';
import { useState } from 'react';

const PaintingContainer = () => {
    const [searchTriggered, setSearchTriggered] = useState(false);
    
    const { data: allPaintings, isLoading: isLoadingAll, error: errorAll } = 
        paintingAPI.useFetchAllPaintingsQuery(6);
    
    const [searchPaintings, { data: searchResults, isLoading: isSearching, error: searchError }] = 
        paintingAPI.useLazySearchPaintingsQuery();

    const handleSearch = (query: string) => {
        searchPaintings(query);
        setSearchTriggered(true);
    };

    const isLoading = searchTriggered ? isSearching : isLoadingAll;
    const error = searchTriggered ? searchError : errorAll;
    const paintings = searchTriggered ? searchResults : allPaintings;

    return (
        <div>
            <SearchBar 
                onSearch={handleSearch} 
                isLoading={isLoading}
            />

            <div className="painting__list">
                {isLoading && <h2>Идет загрузка...</h2>}
                {error && <h2>Произошла ошибка при загрузке</h2>}
                {paintings && paintings.length > 0 ? (
                    paintings.map(painting => (
                        <PaintingItem key={painting.name} painting={painting}/>
                    ))
                ) : (
                    !isLoading && <h2>Ничего не найдено</h2>
                )}
            </div>
        </div>
    );
};

export default PaintingContainer;