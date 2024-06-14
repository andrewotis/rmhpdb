export default function Button({ disabled, onClick, filled, className, children }) {

    return (
        <div 
            className={`hero-btn${filled ? '-filled' : ''} ${disabled ? 'disabled' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );

}