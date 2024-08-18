import { ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ColorList } from "./colorList";

interface ColorPickerProps {
    value?: string,
    onChange: (color: string) => void
    onAddColor: (colors: string[]) => void,
    originalArray: string[]
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value = "#000000", onChange, onAddColor, originalArray }) => {
    const [color, setColor] = useState(value);
    const pickerID = `color-picker_${Date.now()}`;
    const [arrayColors, setArrayColors] = useState<string[]>(originalArray);
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

    //Método para eliminar los colores
    const handleColorDelete = (color: string, droppedOutside: boolean) => {
        setDraggedMouseEnter(false)
        setDraggedColor(null)

        if(droppedOutside){
            const updateColors = arrayColors.filter(c => c !== color)
            setArrayColors(updateColors)
            onAddColor(updateColors)
        }
    }

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value
        setColor(inputValue)
    }

    const handlePickerOpen = () => {
        setIsPickerOpen(true);
    };

    const handlePickerClose = () => {
        setIsPickerOpen(false);
    };

    const handleBlur = () => {
        if (isPickerOpen) {
            const lastArray = [...arrayColors];
            if (!lastArray.includes(color)) {
                lastArray.push(color);
            }
            setArrayColors(lastArray);
            onAddColor(lastArray); //[ ] Llamada para actualizar los colores en el componente padre
            handlePickerClose();
        }
    };

    //[ ] DRAG/DROP
    const [draggedColor, setDraggedColor] = useState<string | null>();
    const [draggedMouseEnter, setDraggedMouseEnter] = useState<boolean>(false);

    const handleDragStart = (colorTarget: string) => {
        setDraggedColor(colorTarget)

        //Se deshabilita el dragg del div principal para evitar colisiones inesperadas
        setDraggedMouseEnter(false)
        setDraggedColor(null)
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Necesario para permitir soltar
    };

    const handleDrop = () => {
        if (draggedColor) {
            const updatedColors = arrayColors.filter(color => color !== draggedColor);
            setArrayColors(updatedColors);
            onAddColor(updatedColors);
            setDraggedColor(null);
        }
    };

    const handleDraggedMouseE = () => {
        setDraggedMouseEnter(true)
    }

    useEffect(() => {
    }, [value]);

    return (
        <div className="mt-[-20px]">
            <div onMouseDown={() => setIsPickerOpen(true)}>
                <input onFocus={handlePickerOpen} onBlur={handleBlur} value={color} onChange={handleColorChange} type={"color"} id={pickerID} className='h-0 w-0 opacity-0' />

                <div onDragOver={handleDragOver} onDrop={handleDrop} onMouseEnter={handleDraggedMouseE} className={`${draggedMouseEnter && draggedColor != null ? 'h-[70px]' : ''} bg-gray-800 flex 0 p-4 rounded-xl w-[185px]`}
                    >
                    {/** ICONO **/}

                    <div>
                        <label htmlFor={pickerID}>
                            <div style={{ backgroundColor: color }} className='w-[35px] absolute h-[35px] rounded-xl'></div>
                            <div style={{ backgroundColor: color }} className='cursor-pointer w-[35px] blur-md opacity-50 h-[35px] rounded-xl'></div>
                        </label>
                    </div>
                    <a className="z-[1] cursor-pointer text-gray-400 p-2 ml-2 text-sm w-[80px] border pt-2 rounded-xl hover:bg-white
                        transition-colors hover:border-black hover:text-gray-700">{color}</a>
                </div>
            </div>

            <ColorList colors={arrayColors} onDragStart={handleDragStart} onDragEnd={handleColorDelete}/>
        </div>
    );
};
