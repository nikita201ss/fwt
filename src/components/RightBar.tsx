import React, { useState } from 'react';
import close from '../style/static/icon/close_icon.svg';
import plus from '../style/static/icon/plus_icon.svg';
import minus from '../style/static/icon/minus_icon.svg';
import minus_years from '../style/static/icon/minus_icon_years.svg';
import FilterSelect from './FilterSelect';
import type { FiltersState } from '../types/filters';

interface RightBarProps {
    onClose: () => void;
    onApplyFilters: (filters: FiltersState) => void;
}

const RightBar: React.FC<RightBarProps> = ({ onClose, onApplyFilters }) => {
    const [openSections, setOpenSections] = useState({
        artist: false,
        location: false,
        years: false
    });
    
    const [filters, setFilters] = useState<FiltersState>({
        artistId: null,
        locationId: null,
        yearFrom: '',
        yearTo: ''
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const fetchArtists = async () => {
        try {
            const response = await fetch('https://test-front.framework.team/authors');
            const data = await response.json();
            console.log('Artists loaded:', data);
            return data;
        } catch (error) {
            console.error('Error loading artists:', error);
            return [];
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch('https://test-front.framework.team/locations');
            const data = await response.json();
            console.log('Locations loaded:', data);
            return data;
        } catch (error) {
            console.error('Error loading locations:', error);
            return [];
        }
    };

    const handleArtistSelect = (artistId: number | null) => {
        console.log('Selected artist:', artistId);
        setFilters(prev => ({ ...prev, artistId }));
    };

    const handleLocationSelect = (locationId: number | null) => {
        console.log('Selected location:', locationId);
        setFilters(prev => ({ ...prev, locationId }));
    };

    const handleYearChange = (type: 'from' | 'to', value: string) => {
        console.log(`Year ${type}:`, value);
        if (type === 'from') {
            setFilters(prev => ({ ...prev, yearFrom: value }));
        } else {
            setFilters(prev => ({ ...prev, yearTo: value }));
        }
    };

    const handleApplyFilters = () => {
        console.log('Applying filters on click:', filters);
        onApplyFilters(filters);
        onClose();
    };

    const handleClearFilters = () => {
        console.log('Clearing filters');
        setFilters({
            artistId: null,
            locationId: null,
            yearFrom: '',
            yearTo: ''
        });
        onApplyFilters({
            artistId: null,
            locationId: null,
            yearFrom: '',
            yearTo: ''
        });
    };

    return (
        <div className="rightbar">
            <div className="rightbar__header">
                <button className="rightbar__close" onClick={onClose}>
                    <img src={close} alt="close" />
                </button>
            </div>
            <div className='rightbar__sections'>
                <div className="rightbar__section">
                    <div className="rightbar__section-header">
                        <h1>Artist</h1>
                        <button 
                            className="rightbar__toggle"
                            onClick={() => toggleSection('artist')}
                        >
                            <img 
                                src={openSections.artist ? minus : plus} 
                                alt={openSections.artist ? "minus" : "plus"} 
                            />
                        </button>
                    </div>
                    {openSections.artist && (
                        <div className="rightbar__content">
                            <FilterSelect
                                label="Artist"
                                placeholder="Select the artist"
                                fetchData={fetchArtists}
                                onSelect={handleArtistSelect}
                                value={filters.artistId}
                                displayKey="name"
                                valueKey="id"
                            />
                        </div>
                    )}
                </div>

                <div className="rightbar__section">
                    <div className="rightbar__section-header">
                        <h1>Location</h1>
                        <button 
                            className="rightbar__toggle"
                            onClick={() => toggleSection('location')}
                        >
                            <img 
                                src={openSections.location ? minus : plus} 
                                alt={openSections.location ? "minus" : "plus"} 
                            />
                        </button>
                    </div>
                    {openSections.location && (
                        <div className="rightbar__content">
                            <FilterSelect
                                label="Location"
                                placeholder="Select the location"
                                fetchData={fetchLocations}
                                onSelect={handleLocationSelect}
                                value={filters.locationId}
                                displayKey="location"
                                valueKey="id"
                            />
                        </div>
                    )}
                </div>

                <div className="rightbar__section">
                    <div className="rightbar__section-header">
                        <h1>Years</h1>
                        <button 
                            className="rightbar__toggle"
                            onClick={() => toggleSection('years')}
                        >
                            <img 
                                src={openSections.years ? minus : plus} 
                                alt={openSections.years ? "minus" : "plus"} 
                            />
                        </button>
                    </div>
                    {openSections.years && (
                        <div className="rightbar__content years-content">
                            <input 
                                type="text" 
                                placeholder="From" 
                                className="rightbar__input years-input"
                                value={filters.yearFrom}
                                onChange={(e) => handleYearChange('from', e.target.value)}
                            />
                            <img src={minus_years} alt="minus_years" />
                            <input 
                                type="text" 
                                placeholder="To" 
                                className="rightbar__input years-input"
                                value={filters.yearTo}
                                onChange={(e) => handleYearChange('to', e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="rightbar__footer">
                <button className="rightbar__submit" onClick={handleApplyFilters}>
                    Show the results
                </button>
                <button className="rightbar__clear" onClick={handleClearFilters}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default RightBar;