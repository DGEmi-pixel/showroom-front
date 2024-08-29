export const LoadingPlaceHolder: React.FC = ({}) => {
    return (
        <div className='flex items-center p-6 mt-[20px] rounded-xl bg-white animate-pulse'>
            <div className='flex-1 space-x-3 inline-flex items-center'>
                <div className="w-6 h-6 border-2 border-gray-300 rounded-md bg-gray-300"></div>
            </div>
            <div className='flex-1 text-[14px] text-center bg-gray-300 h-[20px] rounded'></div>
            <div className='flex-1 flex justify-center items-center'>
                <div className='w-[40px] h-[40px] bg-gray-300 rounded-full'></div>
            </div>
            <div className='flex-1 text-[14px] text-center bg-gray-300 h-[20px] rounded'></div>
            <div className='flex-1 text-[14px] text-center bg-gray-300 h-[20px] rounded'></div>
            <div className='flex-1 text-[14px] text-center bg-gray-300 h-[20px] rounded'></div>                                                
            <div className='flex-1 text-[14px] text-center bg-gray-300 h-[20px] rounded'></div>
            <div className='flex justify-between items-center'>
                <div className='ml-2 p-2 rounded-tl-lg rounded-bl-lg bg-gray-300 w-[70px] h-[40px]'></div>
                <div className='p-3 rounded-tr-lg rounded-br-lg bg-gray-300 w-[40px] h-[40px]'></div>
            </div>
        </div>
    )
}