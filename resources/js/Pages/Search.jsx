import { useState } from "react";
import { router, usePage } from '@inertiajs/react';
import LayoutFour from '../Layouts/LayoutFour';
import FloatingLabelInput from '../Components/FloatingLabelInput';
import Button from '../Components/Button';
import Flash from '../Components/Flash';

export default function Search({ auth, countries, cities, states }) {
    const { flash } = usePage().props;

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        city: "",
        state: "",
        country: ""
    });

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const handleSubmit = _ => {
        router.post('/database/search', values);
    }

    const valid = _ => {
        return values.first_name.length > 0 ||
            values.last_name.length > 0 ||
                values.city.length > 0 ||
                    values.state.length > 0 ||
                        values.country.length > 0;
    }

    return (
        <LayoutFour title="Search" auth={auth}>
            { flash.message && <Flash type="success" message={flash.message}/> }
            <div className="registration-container">
                <form className="registration-form">
                    <FloatingLabelInput 
                        label="First Name"
                        name="first_name"
                        onChange={handleChange}
                        value={values.first_name}
                    />
                    <FloatingLabelInput 
                        label="Last Name"
                        name="last_name"
                        onChange={handleChange}
                        value={values.last_name}
                    />
                    <FloatingLabelInput 
                        label="City"
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                    />                  
                    <FloatingLabelInput 
                        label="State"
                        name="state"
                        onChange={handleChange}
                        value={values.state}
                    />
                    <FloatingLabelInput 
                        label="Country"
                        name="country"
                        onChange={handleChange}
                        value={values.country}
                    />
                    <Button 
                        filled
                        disabled={!valid()}
                        onClick={valid() ? handleSubmit : undefined}
                    >
                        Search
                    </Button>
                </form>
            </div>
        </LayoutFour>
    );
}