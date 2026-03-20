import { type FC } from 'react';
import type { Ipainting } from '../models/IPainting';

interface PaintingItemProps {
    painting: Ipainting;
}

const PaintingItem: FC<PaintingItemProps> = ({ painting }) => {
    return (
        <div className="painting">

            <img
                src={`https://test-front.framework.team${painting.imageUrl}`}
                alt={painting.name}
                className="painting__image"
            />
            <div className="painting__info">
                <div className="painting__txt">
                    <h1>{painting.name}</h1>
                    <p>{painting.created}</p>
                </div>
            </div>

        </div>
    );
};


export default PaintingItem;