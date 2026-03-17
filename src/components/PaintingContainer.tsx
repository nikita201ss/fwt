// import React from 'react';
import { paintingAPI } from '../services/PaintingService';
import PaintingItem from './PaintingItem';

const PaintingContainer = () => {

    const { data: paintings, isLoading, error } = paintingAPI.useFetchAllPaintingsQuery(6)

    return (
        <div>
            <div className="painting__list">
                {isLoading && <h2>Идет загрузка...</h2>}
                {error && <h2>Произошла ошибка при загрузке</h2>}
            {paintings && paintings.map(painting =>
                <PaintingItem key={painting.name} painting={painting}/>
            )}
            </div>

        </div>
    );
};

export default PaintingContainer;