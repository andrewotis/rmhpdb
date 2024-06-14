export default function FloatingLabelInput({type="text", label, name, onChange, value}) {

    return (
        <>
            <input 
                type={type}
                placeholder={label}
                className="form__input" 
                id={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={name} className="form__label">{label}</label>
        </>
    );
}