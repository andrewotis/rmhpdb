import { useState, useEffect } from "react";
import { router, usePage, Link } from '@inertiajs/react';
import { validate } from 'email-validator';
import Flash from "../Flash";

export default function CreateAdmin({ display, setActiveTab }) {
    const { flash } = usePage().props;
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const handleSubmit = _ => {
        router.post("/admin/create/", values);
    }

    const inputValid = _ => {
        return values.first_name.length > 0 &&
            values.last_name.length > 0 &&
                validate(values.email)
    }

    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1><span onClick={() => setActiveTab('users')}>Users</span>Create Admin</h1>
                <p>Create a new administrative account.</p>

                { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
                
                <table style={{width: '500px', marginTop: '1rem', color: "#fff"}}>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>
                                <input 
                                    style={{width: '100%'}} 
                                    id="first_name"
                                    onChange={handleChange} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>
                                <input 
                                    style={{width: '100%'}} 
                                    id="last_name"
                                    onChange={handleChange} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input 
                                    style={{width: '100%'}} 
                                    id="email"
                                    onChange={handleChange} 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    disabled={!inputValid()}
                    onClick={inputValid() ? handleSubmit : undefined}
                >
                    Create
                </button>
            </main>
        </>
    )
}