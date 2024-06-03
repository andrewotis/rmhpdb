import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterCredentials({ display, stepsInfoValid, setStepsInfoValid, credentialsValues, setCredentialsValues, credentials }) {
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

    useEffect(() => {
        if(credentialsValues.length > 0) {
            setStepsInfoValid({...stepsInfoValid, two: true});
        } else {
            setStepsInfoValid({...stepsInfoValid, two: false});
        }
    }, [credentialsValues]);

    return (
        <Container className={`${!display ? 'd-none' : ''} mb-4`}>
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
                        onChange={e => setCredentialsValues(e)}
                    />
                </Col>
            </Row>
        </Container>
    );
}