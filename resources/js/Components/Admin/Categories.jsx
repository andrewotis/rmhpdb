import { useState } from "react";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Flash";

export default function Categories({ display, categories }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [values, setValues] = useState({
        number: '',
        category: ''
    });

    const inputValid = _ => {
        return values.number.length > 0 && values.category.length > 0;
    }

    const handleSubmit = _ => {
        router.post(`/admin/category/`, values);
    }

    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Hazard Categories</h1>
                <p>Manage Hazard Categories.</p>
                { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }

                <table className="admin-privacy-settings-table">
                    <thead>
                        <tr>
                            <td>Number</td>
                            <td>Category</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(cat => {
                                return (
                                    <tr>
                                        <td>{cat.number}</td>
                                        <td>{cat.category}</td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="Number" 
                                    style={{width: '100%'}}
                                    value={values.number}
                                    onChange={e => setValues({...values, number: e.target.value})}
                                />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="Category" 
                                    style={{width: '100%'}}
                                    value={values.category}
                                    onChange={e => setValues({...values, category: e.target.value})}
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