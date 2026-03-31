import { type FC, useState } from 'react';
import type { Ipainting } from '../models/IPainting';
import { useFetchAllAuthorsQuery } from '../services/AuthorService';
import { useFetchAllLocationsQuery } from '../services/LocationService';

interface PaintingItemProps {
    painting: Ipainting;
}

const PaintingItem: FC<PaintingItemProps> = ({ painting }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { data: authors } = useFetchAllAuthorsQuery();
    const { data: locations } = useFetchAllLocationsQuery();

    const author = authors?.find(author => author.id === painting.authorId);

    const location = locations?.find(location => location.id === painting.locationId);

    return (
        <div
            className="painting"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='block-painting'>
                <img
                    src={`https://test-front.framework.team${painting.imageUrl}`}
                    alt={painting.name}
                    className="painting__image"
                />
            </div>
            <div className="painting__info">
                <div className="painting__txt">
                    <div className={`first-info ${isHovered ? 'first-info--hidden' : 'first-info--visible'}`}>
                        <h1>{painting.name}</h1>
                        <p className='years'>{painting.created}</p>
                    </div>
                    <div className={`second-info ${isHovered ? 'second-info--visible' : 'second-info--hidden'}`}>
                        <h1>{author?.name || 'Автор не указан'}</h1>
                        <p className='years'>{location?.location || 'Локация не указана'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaintingItem;