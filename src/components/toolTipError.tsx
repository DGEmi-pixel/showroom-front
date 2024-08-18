import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export const InputError: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className='bg-white p-2 flex items-center border-2 rounded-md text-red-600' >
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-600 mx-3 justify-start" size="lg" />
            <p
                className='z-[10] font-[500] text-xs rounded-lg bg-white px-3 font-sans text-red-600 focus:outline-none flex justify-center'
            >
                {message}
            </p>
        </div>
    )
}