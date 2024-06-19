import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import LayoutFour from '../Layouts/LayoutFour';
import NewPersonalInfo from '../Components/Account/NewPersonalInfo';
import NewAddress from '../Components/Account/NewAddress';
import NewPrivacySettings from '../Components/Account/NewPrivacySettings';
import NewQualifications from '../Components/Account/NewQualifications';
import NewSecurity from '../Components/Account/NewSecurity';
import NewUpdatePassword from '../Components/Account/NewUpdatePassword';
import Button from '../Components/Button';
import { transformedCredentials, transformedCategories, transformedSectors, userMetasToCredentials, 
    userMetasToCategories, userMetasToSectors, transformAdminSettings, userMetasToPrivacySettings } from '../transformTools';
import { createPasswordValidatorSchema } from '../passwordTools';

export default function NewAccount({ auth, user, credentials, categories, sectors, adminSettings }) {
    const [schema, setSchema] = useState(null);
    const [transformedInitialValues, setTransformedInitialValues] = useState({});
    const [values, setValues] = useState({});
    const [activeTab, setActiveTab] = useState('personalInfo');

    useEffect(() => {
        createPasswordValidatorSchema(setSchema);
    },[]);

    useEffect(() => {   // transform data from the database to use in multi-select and toggle switches
        const obj = {
            ...user,
            credentials: userMetasToCredentials(user.credentials, transformedCredentials(credentials)),
            categories: userMetasToCategories(user.categories, transformedCategories(categories)),
            sectors: userMetasToSectors(user.sectors, transformedSectors(sectors)),
            privacy_settings: userMetasToPrivacySettings(user.privacy_settings, transformAdminSettings(adminSettings)),
            password: '',
            confirm_password: ''
        };
        setTransformedInitialValues(obj);   // keep initial copy to track changes
        setValues(obj);
    },[]);
    
    const selectTab = e => {
        setActiveTab(e.target.id);
    }

    const somethingChanged = _ => {
        return JSON.stringify(transformedInitialValues) !== JSON.stringify(values);
    }

    const transformedDataHasLoaded = _ => {
        return JSON.stringify(values) !== "{}";
    }

    const passwordsValid = _ => {
        if(transformedDataHasLoaded()) {
            if(values.password.length > 0 || values.confirm_password.length > 0) {
                return schema.validate(values.password) && values.password == values.confirm_password;
            } else {
                return true;
            }
        }
    }

    const readyToSubmit = _ => {
        return passwordsValid() && somethingChanged()
    }

    const handleSubmit = _ => {
        router.put(`/account/`, {
                old: {...transformedInitialValues},
                new: {...values}
            }
        );
    }

    return (
        <LayoutFour
            title="Account"
            auth={auth}
            noPaddingUnderHeader
        >
            <div className="tabs">
                {
                    [
                        {name: 'personalInfo', label: "Personal Info"},
                        {name: 'address', label: "Address"},
                        {name: 'qualifications', label: "Qualifications"},
                        {name: 'privacySettings', label: "Privacy Settings"},
                        {name: 'updatePassword', label: "Update Password"},
                        /*{name: 'security', label: "Security"}*/
                    ].map(row => {
                        return (
                            <button
                                key={`button-${row.name}`}
                                onClick={selectTab} 
                                id={row.name}
                                className={`tab${activeTab==row.name ? ' active' : ''}`}
                            >
                                {row.label}
                            </button>
                        );
                    })
                }
            </div>
            <div className="registration-input-form-container">
                <form className="registration-input-form">
                    { transformedDataHasLoaded() && // dont render until all data has been transformed
                        <>
                            <NewPersonalInfo 
                                values={values} 
                                setValues={setValues} 
                                display={activeTab=='personalInfo'}
                            />
                            <NewAddress 
                                values={values} 
                                setValues={setValues} 
                                display={activeTab=='address'}
                            />
                            <NewQualifications
                                values={values}
                                setValues={setValues}
                                credentials={transformedCredentials(credentials)}
                                categories={transformedCategories(categories)}
                                sectors={transformedSectors(sectors)}
                                display={activeTab=='qualifications'}
                            />
                            <NewPrivacySettings 
                                display={activeTab=='privacySettings'}
                                adminSettings={transformAdminSettings(adminSettings)}
                                values={values}
                                setValues={setValues}
                            />
                            <NewUpdatePassword 
                                display={activeTab=='updatePassword'}
                                values={values}
                                setValues={setValues}
                                errors={
                                    (values.password.length > 0 || values.confirm_password.length > 0) ? schema.validate(values.password, {details: true}) : undefined
                                }
                            />
                            <NewSecurity 
                                display={activeTab=='security'}
                            />
                        </>

                    }
                    <div className="registration-input-form-controls">
                        <Button 
                            filled
                            disabled={!readyToSubmit()}
                            onClick={readyToSubmit() ? handleSubmit : undefined}
                        >
                            { !passwordsValid() ? 'Invalid Password' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </LayoutFour>
    );
}