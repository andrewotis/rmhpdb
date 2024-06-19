export default function FloatingLabelInput({type="text", label, name, onChange, value, disabled=false}) {

    return (
        <>
            <input 
                type={type}
                placeholder={label}
                className="form__input" 
                id={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor={name} className="form__label">{label}</label>
        </>
    );
}