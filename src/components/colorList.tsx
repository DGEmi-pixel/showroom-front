import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface ColorListProps {
    colors: string[];
    onDragStart: (color: string) => void;
    //Función para detectar si el elemento fue arrastrado fuera de la lista
    onDragEnd: (color: string, droppedOutside: boolean) => void; 
}

//[ ] MÉTODO PARA VERIFICAR SI UN COLOR ES MUY CLARO
const isLightColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};

export const ColorList: React.FC<ColorListProps> = ({ colors, onDragStart, onDragEnd }) => {

    const handleDragEnd = (event: React.DragEvent<HTMLSpanElement>, color: string) => {
        const isOutside = !event.currentTarget.contains(event.relatedTarget as Node)
        onDragEnd(color, isOutside)
    }

    return (
        <div className='px-2 mt-[20px] flex max-w-[180px] max-h-[70px] flex-wrap overflow-y-scroll'>
        {colors.map((color, index) => (
                <span
                    draggable
                    onDragStart={() => onDragStart(color)}
                    onDragEnd={(event) => handleDragEnd(event, color)}
                    style={{ 
                        backgroundColor: color, 
                        borderColor: isLightColor(color) ? '#000' : '#FFF', 
                        borderWidth: '1px', 
                        borderStyle: 'solid',
                    }}
                    key={index}
                    className={`circle h-[20px] w-[20px] rounded-full mx-2 my-2 cursor-pointer`}
                ></span>
            ))}
        </div>
    );
};
