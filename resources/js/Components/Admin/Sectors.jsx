import { useState } from "react";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Flash";

export default function Sectors({ display, sectors }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [values, setValues] = useState({
        number: '',
        nora_sector_group: '',
        naics_code: ''
    });

    const inputValid = _ => {
        return values.number.length > 0 && values.nora_sector_group.length > 0 && values.naics_code.length > 0;
    }

    const handleSubmit = _ => {
        router.post(`/admin/sector`, values);
    }

    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Sectors</h1>
                <p>Manage industry sectors.</p>
                { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
                <table className="admin-privacy-settings-table">
                    <thead>
                        <tr>
                            <td>Number</td>
                            <td>Nora Sector Group</td>
                            <td>NAICS Code</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sectors.map(sector => {
                                return (
                                    <tr key={sector.id}>
                                        <td>{sector.number}</td>
                                        <td>{sector.nora_sector_group}</td>
                                        <td>{sector.naics_code}</td>
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
                                    placeholder="Nora Sector Group" 
                                    style={{width: '100%'}}
                                    value={values.nora_sector_group}
                                    onChange={e => setValues({...values, nora_sector_group: e.target.value})}
                                />
                            </td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="NAICS Code" 
                                    style={{width: '100%'}}
                                    value={values.naics_code}
                                    onChange={e => setValues({...values, naics_code: e.target.value})}
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