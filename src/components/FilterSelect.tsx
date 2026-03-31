import React, { useState, useEffect, useRef } from 'react';
import icon_str from '../style/static/icon/icon-str.svg';
interface FilterSelectProps {
    label: string;
    placeholder: string;
    fetchData: () => Promise<any[]>;
    onSelect: (value: any) => void;
    value?: any;
    displayKey: string;
    valueKey: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
    label,
    placeholder,
    fetchData,
    onSelect,
    value,
    displayKey,
    valueKey
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                const data = await fetchData();
                setItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error(`Error loading ${label}:`, error);
            } finally {
                setLoading(false);
            }
        };
        loadItems();
    }, [label, fetchData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = items.filter(item =>
                item[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(items);
        }
    }, [searchTerm, items, displayKey]);

    const handleSelect = (item: any) => {
        onSelect(item[valueKey]);
        setIsOpen(false);
        setSearchTerm('');
    };

    const getDisplayValue = () => {
        if (!value) return '';
        const selectedItem = items.find(item => item[valueKey] === value);
        return selectedItem ? selectedItem[displayKey] : '';
    };

    return (
        <div className="filter-select" ref={dropdownRef}>
            <div className="filter-select__wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="rightbar__input_select"
                    placeholder={placeholder}
                    value={isOpen ? searchTerm : getDisplayValue()}
                    onChange={(e) => {
                        if (!isOpen) setIsOpen(true);
                        setSearchTerm(e.target.value);
                    }}
                    onFocus={() => setIsOpen(true)}
                    readOnly={!isOpen}
                />
                <button
                    className="filter-select__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                   <img src={icon_str} alt="icon-str" />
                </button>
            </div>
            {isOpen && (
                <div className="filter-select__dropdown">
                    {loading ? (
                        <div className="filter-select__loading">Loading...</div>
                    ) : filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item[valueKey]}
                                className={`filter-select__option ${value === item[valueKey] ? 'selected' : ''}`}
                                onClick={() => handleSelect(item)}
                            >
                                <p className='filter-select__txt'>{item[displayKey]}</p>
                            </div>
                        ))
                    ) : (
                        <div className="filter-select__empty">No items found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterSelect;