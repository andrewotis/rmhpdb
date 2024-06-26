import { useState, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Flash";
import { createPasswordValidatorSchema } from '../../passwordTools';
import { validate } from 'email-validator';

export default function UpdateAccount({ display, auth }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [schema, setSchema] = useState(null);
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });
    const [passwordErrors, setPasswordErrors] = useState('');

    useEffect(() => {
        createPasswordValidatorSchema(setSchema);
    },[]);

    useEffect(() => {
        if(schema && (values.password.length > 0 || values.confirm_password.length > 0)) {
            const errors = schema.validate(values.password, { details: true });
            let str = "";
            if(values.password !== values.confirm_password) {
                str += "Passwords must match\n";
            }
            errors.map(error => str += error.message.replace("The string", 'Password') + "\n");
            setPasswordErrors(str);
        } else setPasswordErrors('');
    },[values.password, values.confirm_password])

    useEffect(() => {
        setValues({
            ...values,
            email: auth.email
        });
    },[auth]);

    const passwordValid = _ => {
        return values.password == values.confirm_password &&
            schema.validate(values.password)
    }
    
    const inputValid = _ => {   // 3 possibilites: update email, update password, update both
        if(values.email !== auth.email && values.password.length == 0) {
            return validate(values.email);
        }
        if(values.email == auth.email && values.password.length > 0) {
            return passwordValid();
        }
        if(values.email !== auth.email && values.password.length > 0) {
            return validate(values.email) && passwordValid();
        }
        return false;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(inputValid()) {
            router.put(`/admin/account`, values);
        }
    }

    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Update Account</h1>
                <p>Change email address or password of the currently logged in admin account. You can update email, update password, or update both.</p><br />
                { flash.message && <><div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div><br /></> }
                { errors.error && <><div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div><br /></> }
                { passwordErrors.length > 0 && <><div style={{backgroundColor: "#fff", whiteSpace: 'pre-line'}}><Flash type="error" message={passwordErrors}/></div><br /></> }
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="email"
                        style={{padding: '5px', width: '300px'}}
                        autoComplete="username"
                        value={values.email}
                        onChange={e => setValues({...values, email: e.target.value})}
                    /><br /><br />
                    <input 
                        type="password"
                        name="password"
                        style={{padding: '5px', width: '300px'}}
                        value={values.password}
                        autoComplete="new-password"
                        placeholder="New Password"
                        onChange={e => setValues({...values, password: e.target.value})}
                    />
                    <br /><br />
                    <input 
                        type="password"
                        name="confirm_password"
                        style={{padding: '5px', width: '300px'}}
                        value={values.confirm_password}
                        placeholder="Confirm New Password"
                        autoComplete="new-password"
                        onChange={e => setValues({...values, confirm_password: e.target.value})}
                    /><br />
                    <button
                        disabled={!inputValid()}
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </main>
        </>
    )
}