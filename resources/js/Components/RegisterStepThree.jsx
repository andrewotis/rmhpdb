import { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterStepThree({ values, setValues, display, credentials }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let o = [];
        credentials.map(credential => {
            o.push({
                value: credential.id,
                label: `${credential.credential} - ${credential.description}`
            });
        });
        setOptions(o)
    },[credentials]);

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    return (
        <Container className={`${!display ? 'd-none' : ''} mb-3`}>
            <Row>
                <Col lg={getColSize()} className="text-center fs-5 mb-3">
                    Please confirm your credentials
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <Select
                        id="credselect"
                        isMulti
                        options={options}
                        onChange={e => setValues({...values, credentials: e})}
                    />
                </Col>
            </Row>
        </Container>
    );
}
