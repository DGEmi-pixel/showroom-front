"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useState, useEffect} from 'react'
import Modal from 'react-modal'
import { ModalProps } from '@/types/modal.types';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        outline: 'none',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: '10px',
        padding: '20px',
        transition: 'transform 300ms ease-in-out',
        width: '500px',
        height: '350px'
    },
};

export const ModalComponent: React.FC<ModalProps> = ({modalTitle, sectionCount, methods}) => {

    //MODAL
    const [modalIsOpen, setIsOpen] = useState(false)

    //ANIMACIONES DE LABELS
    const [isFocus, setIsFocus] = useState([false, false, false, false])

    const handleLavelAnimation = (index: number) => {
        setIsFocus(prevState => {
            const updatedState = [...prevState];
            updatedState[index] = !prevState[index];
            return updatedState;
        })
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        Modal.setAppElement('#rootmodal');
    }, []);

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                overlayClassName="ModalOverlay"
                className={{
                    base: 'ModalContent',
                    afterOpen: 'ModalContent--after-open',
                    beforeClose: 'ModalContent--before-close',
                }}
                closeTimeoutMS={300}
                contentLabel="Example Modal"
            >
                
                <h2 className='text-dashboard-color-primary font-bold text-[18px]'>{modalTitle}</h2>
                <form className='relative'>
                    <div className='flex flex-wrap h-[200px] items-center'>
                        {sectionCount.map((section, index) => (
                            <div key={index} className='relative flex flex-col w-[200px] mt-[12px] rounded-md transition-all duration-300 ease-in-out'>
                                <label
                                    className={`absolute ${isFocus[index] || section.name.length > 0 ? 'translate-y-[-20px] text-[16px]' : 'translate-y-[18px] left-[10px] text-[15px]'} 
                                    block transition-all duration-300 ease-in-out transform`}>{section.name}</label>
                                <input type={section.type}
                                    onChange={(e) => methods[index].setter(e.target.value)} 
                                    value={methods[index].value}
                                    onFocus={() => handleLavelAnimation(index)}
                                    onBlur={() => handleLavelAnimation(index)}
                                    required
                                    className='shadow-dashboard-input-shadow_2 outline-none w-[100%] mt-[10px] px-2 py-2 text-[#333] text-[16px] rounded-[0.2rem]
                                    block transition-all duration-300 ease-in-out' />
                            </div>
                        ))}
                    </div>
                    
                    <FontAwesomeIcon
                        onClick={closeModal}
                        className='absolute top-[-50px] right-[-24px] text-[27px] 
                        text-dashboard-color-danger cursor-pointer'
                        icon={faXmarkCircle}>
                        
                    </FontAwesomeIcon>
                    <button type="submit" 
                        className='absolute bottom-[-85px] right-[30%] w-[160px] py-[12px] text-[16px] rounded-[3px] uppercase tracking-[1.5px] text-center font-bold bg-dashboard-color-white shadow-dashboard-modal-button-shadow
                        before:absolute before:top-0 before:left-1/2 before:right-1/2 before:bottom-0 before:opacity-0 before:bg-dashboard-color-primary before:transition-all before:rounded-[3px] before:duration-[0.4s] before:ease-in-out    
                        z-[-2]
                        hover:before:left-0 hover:before:right-0 hover:before:opacity-100 hover:before:text-dashboard-color-white
                        focus:before:left-0 focus:before:right-0 focus:before:opacity-100 focus:before:text-dashboard-color-white
                        '>
                        <span className='z-[100]
                        before:absolute before:top-0 before:left-1/2 before:right-1/2 before:bottom-0 before:opacity-0 before:bg-dashboard-color-primary before:transition-all before:rounded-[3px] before:duration-[0.4s] before:ease-in-out'>
                            Actualizar
                        </span>
                    </button>
                </form>
                    
            </Modal>
        </div>
    )
}