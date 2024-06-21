import { useState, useEffect } from 'react';
import { Country, State, City }  from 'country-state-city';
import { handleCountryChange, handleStateChange, selectLabelStyle } from '../../addressSelectTools';
import FloatingLabelInput from './../FloatingLabelInput';

export default function NewRegisterStepOne({ values, handleChange, display, setValues }) {
    const [selectedCountryIsoCode, setSelectedCountryIsoCode] = useState('');
    const [selectedStateIsoCode, setSelectedStateIsoCode] = useState('');
    const [selectInFocus, setSelectInFocus] = useState({
        country: false,
        state: false,
        city: false
    });

    const handleAddressChange = e => {
        let address = "";
        if(e.target.id == 'address_one') {
            address = values.address_two !== '' ? e.target.value + "\n" + values.address_two : e.target.value;
        } else if(e.target.id == 'address_two') {
            address = e.target.value !== '' ? values.address_one + "\n" + e.target.value : values.address_one;
        }
        setValues({
            ...values, 
            [e.target.id] : e.target.value,
            address: address
        });
    };


    useEffect(() => {
        window.setTimeout( () => {
            document.querySelector('.footer').scrollIntoView();
        }, 10);
    },[values.city, values.state, values.country]);

    return (
        <div className={!display ? 'display-none' : ''}>
            <FloatingLabelInput 
                name="address_one"
                label="Address"
                value={values.address_one}
                onChange={handleAddressChange}
            />
            <FloatingLabelInput 
                name="address_two"
                label="Address2"
                value={values.address_two}
                onChange={handleAddressChange}
            />
            <select 
                name="country" 
                onChange={(e) => handleCountryChange(e, Country, setValues, values, setSelectedCountryIsoCode)} 
                onFocus={() => setSelectInFocus({...selectInFocus, country: true})}
                onBlur={() => setSelectInFocus({...selectInFocus, country: false})}
            >
                <option value=""></option>
                <option value="US">United States</option>
                { Country.getAllCountries().filter(c => c.name !== 'United States').map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>) }
            </select>
            <label 
                htmlFor="country"
                className="form__label"
                style={(values.country !== '' || selectInFocus.country) ? selectLabelStyle : undefined}
            >
                Country
            </label>
            { 
                values.country !== '' &&
                <>
                    <select 
                        name="state"
                        onChange={(e) => handleStateChange(e, State, setValues, values, setSelectedStateIsoCode, selectedCountryIsoCode)}
                        onFocus={() => setSelectInFocus({...selectInFocus, state: true})}
                        onBlur={() => setSelectInFocus({...selectInFocus, state: false})}
                    >
                        <option value=""></option>
                        { State.getStatesOfCountry(selectedCountryIsoCode).map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>) }
                    </select>
                    <label 
                        htmlFor="state"
                        className="form__label"
                        style={(values.state !== '' || selectInFocus.state) ? selectLabelStyle : undefined}
                    >
                        State
                    </label>
                </>
            }
            { 
                values.state !== '' && 
                <>
                    <select
                        name="city"
                        onChange={(e) => setValues({...values, city: e.target.value})}
                        onFocus={() => setSelectInFocus({...selectInFocus, city: true})}
                        onBlur={() => setSelectInFocus({...selectInFocus, city: false})}
                    >
                        <option value=""></option>
                        { City.getCitiesOfState(selectedCountryIsoCode, selectedStateIsoCode).map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>) }
                    </select>
                    <label 
                        htmlFor="city"
                        className="form__label"
                        style={(values.city !== '' || selectInFocus.city) ? selectLabelStyle : undefined}
                    >
                        City
                    </label>
                </>
            }
            {
                values.city !== '' &&
                <>
                    <FloatingLabelInput 
                        name="zip"
                        label="Zip"
                        value={values.zip}
                        onChange={handleChange}
                    />
                </>
            }
        </div>
    );
}