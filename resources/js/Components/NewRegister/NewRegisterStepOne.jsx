import { useState, useEffect } from 'react';
import { Country, State, City }  from 'country-state-city';
import FloatingLabelInput from './../FloatingLabelInput';

export default function NewRegisterStepOne({ values, handleChange, display, setValues }) {
    const [selectedCountryIsoCode, setSelectedCountryIsoCode] = useState('');
    const [selectedStateIsoCode, setSelectedStateIsoCode] = useState('');
    const [selectInFocus, setSelectInFocus] = useState({
        country: false,
        state: false,
        city: false
    });

    useEffect(() => {
        window.setTimeout( () => {
            document.querySelector('.footer').scrollIntoView();
        }, 10);
    },[values.city, values.state, values.country]);

    const handleCountryChange = e => {
        if(e.target.value == "") {
            setValues({...values, country: ''});
        }
        const country = Country.getCountryByCode(e.target.value);
        setValues({...values, 
            country: country.name,
            state: '', // reset state
            city: '' // reset city
        });
        setSelectedCountryIsoCode(country.isoCode);
    }   

    const handleStateChange = e => {
        if(e.target.value == "") {
            setValues({...values, state: ''});
        }
        const state = State.getStateByCodeAndCountry(e.target.value, selectedCountryIsoCode);
        setValues({...values, 
            state: state.name,
            city: '' // reset city
        });
        setSelectedStateIsoCode(state.isoCode);
    }

    const selectLabelStyle = {
        transform: "translateY(-4.50rem) scale(1)",
        color: '#000'
    };

    return (
        <div className={!display ? 'display-none' : ''}>
            <FloatingLabelInput 
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
            />
            <FloatingLabelInput 
                name="address2"
                label="Address2"
                value={values.address2}
                onChange={handleChange}
            />
            <select 
                name="country" 
                onChange={handleCountryChange} 
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
                        onChange={handleStateChange}
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