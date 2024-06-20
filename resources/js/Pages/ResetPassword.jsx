import { useState, useEffect } from "react";
import LayoutFour from "../Layouts/LayoutFour";
import FloatingLabelInput from "../Components/FloatingLabelInput";
import Button from "../Components/Button";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Components/Flash";
import { createPasswordValidatorSchema } from '../passwordTools';

export default function ResetPassword({ user, token }) {
    const { flash } = usePage().props;
    const [schema, setSchema] = useState(null);
    const [values, setValues] = useState({
        password: '',
        confirm_password: ''
    });

    useEffect(() => {
        createPasswordValidatorSchema(setSchema);
    },[]);

    const passwordsValid = _ => {
        if(schema !== null) {
            return schema.validate(values.password) && values.password == values.confirm_password;
        }
        return false;
    }

    const errors = _ => {
        let message = "";
        if(values.password.length > 0 || values.confirm_password.length > 0) {
            if(values.password !== values.confirm_password) {
                message += "Passwords do not match\n";
            }
            const e = schema.validate(values.password, {details: true});
            e.map(r => message += r.message.replace("The string", "Password") + "\n")
        }
        return message !== "" ? <div style={{ whiteSpace: 'pre-line' }} className="password-errors"><Flash type="error" message={message} /></div> : null;
    }

    const handleSubmit = _ => {
        router.put(`/account/password/forgot`, {
            password: values.password,
            token: token
        });    
    }

    return (
        <LayoutFour
            title="Reset Password"
        >
            { flash.message && <Flash type="success" message={flash.message}/> }
            <div className="registration-container">
                <form className="registration-form">
                    { errors() }
                    <div className="text-align-center">
                        Reset password for <i>{user.email}</i><br /><br />
                    </div>
                    <FloatingLabelInput
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={e => setValues({...values, password: e.target.value})}
                    />
                    <FloatingLabelInput
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        value={values.confirm_password}
                        onChange={e => setValues({...values, confirm_password: e.target.value})}
                    />
                    <Button 
                        filled
                        disabled={!passwordsValid()}
                        onClick={passwordsValid() ? handleSubmit : undefined}
                    >
                        Reset
                    </Button>

                </form>
            </div>
        </LayoutFour>
    );
}