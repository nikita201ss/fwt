import { paintingAPI } from '../services/PaintingService';
import PaintingItem from './PaintingItem';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useState } from 'react';
import type { Ipainting } from '../models/IPainting';
import type { FiltersState } from '../types/filters'; 

const PaintingContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FiltersState>({
        artistId: null,
        locationId: null,
        yearFrom: '',
        yearTo: ''
    });

    const itemsPerPage = 6;

    const {
        data: paintingsData,
        isLoading,
        error
    } = paintingAPI.useFetchPaintingsQuery({
        page: currentPage,
        limit: itemsPerPage,
        searchTerm: searchQuery || undefined,
        authorId: filters.artistId || undefined,
        locationId: filters.locationId || undefined,
        yearFrom: filters.yearFrom || undefined,
        yearTo: filters.yearTo || undefined
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilters: FiltersState) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const paintings: Ipainting[] = paintingsData?.data || [];
    const totalCount = paintingsData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const hasNoResults = !isLoading && !error && paintings.length === 0;

    return (
        <div>
            <SearchBar
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                isLoading={isLoading}
            />

            <div className="painting__list">
                {isLoading && <h2>Loading...</h2>}
                {error && <h2>Error occurred</h2>}
                <div className='notRes'>
                    {hasNoResults && <p>No matches for <span className='notRes__search'>{searchQuery}</span></p>}
                    {hasNoResults && <p className='notRes__add'>Please try again with a different spelling or keywords.</p>}
                </div>
                {!isLoading && !error && paintings.length > 0 && (
                    <>
                        {paintings.map((painting: Ipainting) => (
                            <PaintingItem key={painting.id || painting.name} painting={painting} />
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