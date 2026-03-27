import { paintingAPI } from '../services/PaintingService';
import PaintingItem from './PaintingItem';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useState} from 'react';

const PaintingContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const itemsPerPage = 6;
    
    const { 
        data: allPaintingsData, 
        isLoading: isLoadingAll, 
        error: errorAll 
    } = paintingAPI.useFetchAllPaintingsQuery({ 
        page: currentPage, 
        limit: itemsPerPage 
    }, {
        skip: searchTriggered
    });
    
    const { 
        data: searchData, 
        isLoading: isSearching, 
        error: searchError 
    } = paintingAPI.useSearchPaintingsQuery({ 
        searchTerm: searchQuery, 
        page: currentPage, 
        limit: itemsPerPage 
    }, {
        skip: !searchTriggered
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setSearchTriggered(true);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isLoading = searchTriggered ? isSearching : isLoadingAll;
    const error = searchTriggered ? searchError : errorAll;
    const paintingsData = searchTriggered ? searchData : allPaintingsData;
    const paintings = paintingsData?.data || [];
    const totalCount = paintingsData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const hasNoResults = !isLoading && !error && paintings.length === 0;

    return (
        <div>
            <SearchBar 
                onSearch={handleSearch} 
                isLoading={isLoading}
            />
            

            <div className="painting__list">
                {isLoading && <h2>Идет загрузка...</h2>}
                {error && <h2>Произошла ошибка при загрузке</h2>}
                {hasNoResults && <h2>No matches for {searchQuery}</h2>}
                {hasNoResults && <span>Please try again with a different spelling or keywords.</span>}
                {!isLoading && !error && paintings.length > 0 && (
                    <>
                        {paintings.map(painting => (
                            <PaintingItem key={painting.id || painting.name} painting={painting}/>
                        ))}
                    </>
                )}
            </div>

            {!isLoading && !error && totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default PaintingContainer;