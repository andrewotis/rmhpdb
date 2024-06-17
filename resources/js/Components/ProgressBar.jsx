export default function ProgressBar({percentage, text, className}) {
    return (
        <div className="progress-container"> 
            <div 
                className="progress-done"
                style={{width: `${percentage}%`}}
            >
                {text}
            </div> 
        </div> 
    );
}