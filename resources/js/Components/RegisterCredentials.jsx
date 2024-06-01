import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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

    useEffect(() => {
        if(credentialsValues.length > 0) {
            setStepsInfoValid({...stepsInfoValid, two: true});
        } else {
            setStepsInfoValid({...stepsInfoValid, two: false});
        }
    }, [credentialsValues]);

    return (
        <Container className={`${!display ? 'd-none' : ''}`}>
            Please confirm your credentials<br />
            <Container className="w-50 mb-3">
                <Select
                    id="credselect"
                    isMulti
                    options={options}
                    onChange={e => setCredentialsValues(e)}
                />
            </Container>
        </Container>
    );
}