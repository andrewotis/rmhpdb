export default function ToggleSwitch({checked=false, id, onChange}) {
    return (
        <label className="switch">
            <input 
                type="checkbox" 
                checked={checked}
                id={id}
                onChange={onChange}
            />
            <span className="slider round" />
        </label>
    );
}