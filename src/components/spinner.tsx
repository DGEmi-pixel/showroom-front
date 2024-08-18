interface spinnerProps {
    top?: string,
    left?: string,
    bottom?: string,
    right?: string,
    width?: string,
    height?: string
}

export const Spinner: React.FC<spinnerProps> = ({top, left, right, bottom, width, height}) => { 
    
    return (
        <main>
            <div
                style={{
                        width: width || '120px',
                        height: height || '120px',
                        borderColor: '#1e90ff transparent #1e90ff transparent',
                        top: top || '',
                        left: left || (bottom && '50%'),
                        bottom: bottom || '10px',
                        right: right || '',
                        // transform: (bottom && !top && !left &&!right) ? 'translateX(-50%)' : ''
                }} 
                className="fixed spinnerRotate border-[6px] border-solid rounded-full">
            </div>
        </main>
    )
}