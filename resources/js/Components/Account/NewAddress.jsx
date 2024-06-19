import { useState, useEffect } from 'react';
import FloatingLabelInput from '../FloatingLabelInput';
import { Country, State, City }  from 'country-state-city';
import { handleCountryChange, handleStateChange, selectLabelStyle } from '../../addressSelectTools';

export default function NewAddress({display, values, setValues}) {
    const [selectedCountryIsoCode, setSelectedCountryIsoCode] = useState('');
    const [selectedStateIsoCode, setSelectedStateIsoCode] = useState('');
    const [selectedCityIsoCode, setSelectedCityIsoCode] = useState('');
    const [selectInFocus, setSelectInFocus] = useState({
        country: false,
        state: false,
        city: false
    });

    useEffect(() => {      // if values are set for country, state, city, select them in the dropdowns
        let countryIsoCode, stateIsoCode = "";
        if(values.country !== '') {     // find the isoCode for the recorded country and setSelectedCountryIsoCode
            countryIsoCode = Country.getAllCountries().find(c => c.name == values.country).isoCode;
        }
        if(values.state !== "") {
            stateIsoCode = State.getStatesOfCountry(countryIsoCode).find(s => s.name == values.state).isoCode;
        }
        setSelectedStateIsoCode(stateIsoCode);
        setSelectedCountryIsoCode(countryIsoCode);
    },[]);

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const filterNumbers = e => {
        const formatted = maskPhoneNumber(e.target.value);

        setValues(values => ({
            ...values,
            phone_number: formatted
        }));
    }

    return (
        <div className={`tab-content${!display ? ' display-none' : ''}`}>
            <FloatingLabelInput
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
            />
            <FloatingLabelInput
                label="Address2"
                name="address2"
                value={values.address2}
                onChange={handleChange}
            />
            <select 
                name="country" 
                onChange={(e) => handleCountryChange(e, Country, setValues, values, setSelectedCountryIsoCode)} 
                onFocus={() => setSelectInFocus({...selectInFocus, country: true})}
                onBlur={() => setSelectInFocus({...selectInFocus, country: false})}
            >
                <option value=""></option>
                <option value="US" selected={values.country == "United States" ? true : false}>United States</option>
                { Country.getAllCountries().filter(c => c.name !== 'United States').map(c => <option key={c.isoCode} selected={c.isoCode==selectedCountryIsoCode} value={c.isoCode}>{c.name}</option>) }
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
                        { State.getStatesOfCountry(selectedCountryIsoCode).map(s => <option key={s.isoCode} selected={s.isoCode==selectedStateIsoCode} value={s.isoCode}>{s.name}</option>) }
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
                        { City.getCitiesOfState(selectedCountryIsoCode, selectedStateIsoCode).map((c,i) => <option key={`${c.name}${i}`} selected={c.name == values.city} value={c.name}>{c.name}</option>) }
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