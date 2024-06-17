import { useState } from 'react';
import { Form, Container, Col, Row, FloatingLabel } from 'react-bootstrap';
import { Country, State, City }  from 'country-state-city';

export default function RegisterStepOne({ values, setValues, display }) {
    const [selectedCountryIsoCode, setSelectedCountryIsoCode] = useState('');
    const [selectedStateIsoCode, setSelectedStateIsoCode] = useState('');

    const handleChange = e => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    const filterNumbers = e => {
        const filtered = e.target.value.replace(/[^0-9]/g, '');
        setValues(values => ({
            ...values,
            zip: filtered
        }));
    }

    const handleCountryChange = e => {
        const country = Country.getCountryByCode(e.target.value);
        setValues({...values, country: country.name});
        setSelectedCountryIsoCode(country.isoCode);
    }

    const handleStateChange = e => {
        const state = State.getStateByCodeAndCountry(e.target.value, selectedCountryIsoCode);
        setValues({...values, state: state.name});
        setSelectedStateIsoCode(state.isoCode);
    }

    return (
        <Container className={!display ? 'd-none' : ''}>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="address"
                        label="Address"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Address" 
                            id="address"
                            value={values.address}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="address2"
                        label="Address 2"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Address 2" 
                            id="address2"
                            value={values.address2}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <Form.Select size="lg" onChange={handleCountryChange} className="mb-3 fs-6">
                        <option value="">Country</option>
                        <option value="US">United States</option>
                        { Country.getAllCountries().filter(c => c.name !== 'United States').map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>) }
                    </Form.Select>
                </Col>
            </Row>
            { values.country !== '' && 
                <Row>
                    <Col lg={getColSize()}>
                        <Form.Select size="lg" onChange={handleStateChange} className="mb-3 fs-6">
                            <option value="">State</option>
                            { State.getStatesOfCountry(selectedCountryIsoCode).map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>) }
                        </Form.Select>
                    </Col>
                </Row>
            }
            { values.state !== '' && 
                <Row>
                    <Col lg={getColSize()}>
                        <Form.Select size="lg" onChange={(e) => setValues({...values, city: e.target.value})} className="mb-3 fs-6">
                            <option value="">City</option>
                            { City.getCitiesOfState(selectedCountryIsoCode, selectedStateIsoCode).map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>) }
                        </Form.Select>
                    </Col>
                </Row>
            }
            { values.city !== '' && 
                <Row>
                    <Col lg={getColSize()}>
                        <FloatingLabel
                            htmlFor="zip"
                            label="Zip"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="text" 
                                placeholder="Zip" 
                                id="zip"
                                value={values.zip}
                                onChange={filterNumbers}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            }
        </Container>
    );
}
