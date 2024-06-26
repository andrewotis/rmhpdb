import { useState } from "react";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Flash";

export default function Credentials({ display, credentials }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [values, setValues] = useState({
        credential: '',
        description: ''
    });

    const inputValid = _ => {
        return values.credential.length > 0 && values.description.length > 0;
    }

    const handleSubmit = _ => {
        router.post(`/admin/credential`, values);
    }

    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Credentials</h1>
                <p>Manage Credentials.</p>
                { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
                <table className="admin-privacy-settings-table">
                    <thead>
                        <tr>
                            <td>Credential</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            credentials.map(cred => {
                                return (
                                    <tr key={cred.id}>
                                        <td>{cred.credential}</td>
                                        <td>{cred.description}</td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="Credential" 
                                    style={{width: '100%'}}
                                    value={values.credential}
                                    onChange={e => setValues({...values, credential: e.target.value})}
                                />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="Description" 
                                    style={{width: '100%'}}
                                    value={values.description}
                                    onChange={e => setValues({...values, description: e.target.value})}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    disabled={!inputValid()}
                    onClick={inputValid() ? handleSubmit : undefined}
                >
                    Add
                </button>
            </main>
        </>
    )
}