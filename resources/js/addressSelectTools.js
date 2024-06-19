export const handleCountryChange = (e, Country, setValues, values, setSelectedCountryIsoCode) => {
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

export const handleStateChange = (e, State, setValues, values, setSelectedStateIsoCode, selectedCountryIsoCode) => {
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

export const selectLabelStyle = {
    transform: "translateY(-4.50rem) scale(1)",
    color: '#000'
};