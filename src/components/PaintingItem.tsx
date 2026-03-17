import { type FC } from 'react';
import type { Ipainting } from '../models/IPainting';

interface PaintingItemProps {
    painting: Ipainting;
}

const PaintingItem: FC<PaintingItemProps> = ({painting}) => {
    return (
        <div className="painting">
            {painting.name}. {painting.created}
        </div>
    );
};


export default PaintingItem;