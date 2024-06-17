import { useEffect, useState } from 'react';
import FloatingLabelInput from '../FloatingLabelInput';

export default function NewRegisterStepSix({ values, setValues, display, errors, handleChange }) {
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
        <div className={!display ? 'display-none' : ''}>
            { errorText !== '' ? <div style={{ whiteSpace: 'pre-line' }} className="password-errors">{ errorText }<br/></div> : undefined }
            <FloatingLabelInput 
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
            />
            <FloatingLabelInput 
                name="confirm_password"
                label="Confirm Password"
                type="password"
                value={values.confirm_password}
                onChange={handleChange}
            />
        </div>
    );
}