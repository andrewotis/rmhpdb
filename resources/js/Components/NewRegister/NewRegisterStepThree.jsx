import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function NewRegisterStepThree({ values, handleChange, display, setValues, credentials }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let o = [];
        credentials.map(credential => {
            o.push({
                value: credential.id,
                label: `${credential.credential} - ${credential.description}`
            });
        });
        setOptions(o)
    },[credentials]);

    return (
        <div className={!display ? 'display-none' : ''}>
            <div className="text-align-center">
                Please confirm your credentials
            </div>
            <Select
                id="credselect"
                isMulti
                options={options}
                onChange={e => setValues({...values, credentials: e})}
            />
        </div>
    );
}