export default function Button({ disabled, onClick, filled, className, children, style }) {

    return (
        <div 
            className={`hero-btn${filled ? '-filled' : ''} ${disabled ? 'disabled' : ''} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );

}