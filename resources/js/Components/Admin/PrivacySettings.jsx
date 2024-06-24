import { useEffect, useState } from "react";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Flash";
import ToggleSwitch from "../ToggleSwitch";

export default function PrivacySettings({ display, adminSettings }) {
    const [values, setValues] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const { errors } = usePage().props;
    const { flash } = usePage().props;

    useEffect(() => {
        const obj = {};
        adminSettings.map(s => {
            if(s.type=="privacy") {
                obj[s.key] = s.value == "true" ? true : false
            }
        });
        setValues(obj);
        setInitialValues(obj);
    },[adminSettings]);

    const toggleValue = setting => {
        setValues({...values, [setting] : !values[setting]});
    }

    const validInput = _ => {
        return JSON.stringify(values) !== JSON.stringify(initialValues);
    }

    const handleSubmit = _ => {
        router.post(`/admin/privacy/`, {settings: values});
    }

    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Privacy Settings</h1>
                <p>
                    Manage privacy settings. This configuration overrides user privacy settings. For example, if a user has "first name" set to private, but "first name" is not allowed to be set to private in this list, their first name will be displayed in the database. Values here that are not allowed to be set to private will not show up as configuration options in the privacy settings for the user, but if a user has a certain field configured in their privacy settings and that field is subsequently dis-allowed from the privacy settings by an admin, their record will be overridden. 
                </p>
                { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
                <table className="admin-privacy-settings-table" >
                    <tr>
                        <td>Setting</td>
                        <td>Configurable</td>
                    </tr>
                    {
                        adminSettings.map(setting => {
                            return setting.type == 'privacy' && (
                                <tr key={`p-${setting.key}`}>
                                    <td>{setting.key.replace("_", " ")}</td>
                                    <td>
                                        <ToggleSwitch 
                                            checked={values[setting.key]}
                                            id={setting.key}
                                            onChange={() => toggleValue(setting.key)}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </table>
                <button
                    disabled={!validInput()}
                    onClick={validInput() ? handleSubmit : undefined}
                >
                    Update
                </button>
            </main>
        </>
    )
}