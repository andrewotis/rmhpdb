import { useState, useEffect } from 'react';
import FloatingLabelInput from '../FloatingLabelInput';

export default function NewUpdatePassword({display, values, setValues, errors}) {
    const [errorText, setErrorText] = useState('');
    useEffect(() => {
        if(errors !== undefined) {
            let a = "";
            errors.map(e => a += e.message.replace("The string", "Password") + `\n`);
            if(values.password !== values.confirm_password) a+= "Passwords do not match." + `\n`;
            setErrorText(a);
        } else {
            setErrorText('');
        }
    },[errors]);

    return (
        <div className={`tab-content${!display ? ' display-none' : ''}`}>
            { errorText !== '' ? <div style={{ whiteSpace: 'pre-line' }} className="password-errors">{ errorText }<br/></div> : undefined }
            <FloatingLabelInput
                type="password"
                name="password"
                label="Password"
                onChange={e => setValues({...values, password: e.target.value})}
                value={values.password}
            />
            <FloatingLabelInput
                type="password"
                name="confirm_password"
                label="Confirm Password"
                onChange={e => setValues({...values, confirm_password: e.target.value})}
                value={values.confirm_password}
            />
        </div>
    );
}