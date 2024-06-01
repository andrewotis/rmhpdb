import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function AccountPrivacy({auth, adminSettings, privacySettings}) {
    const { flash } = usePage().props;
    const [values, setValues] = useState({});

    const translate = field => {
        return field.replace('_', ' ');
    }

    useEffect(() => {
        let obj = {};
        privacySettings.map(setting => {
            obj[setting.key] = true;
        });
        setValues(obj);
    },[]);

    const handleChange = e => {
        if(e.target.checked) {
            setValues({...values, [e.target.id] : true});
        } else {
            setValues(Object.fromEntries((Object.entries(values).filter(([k, v]) => k != e.target.id))))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/account', {
            'key' : 'privacy',
            'data' : {...values, id: auth.id}
        });
    }

    return (
        <>
            { flash.message && 
                <Alert variant="success">
                    {flash.message}
                </Alert> }
            <h4 className="mb-4">Choose the fields you would like to keep hidden on the public database:</h4>
            <Form noValidate onSubmit={handleSubmit}>
                <Row>
                    {adminSettings.map(setting => {
                        return (
                            setting.value == 'true' && 
                                <Col key={setting.id} sm="6" className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id={setting.key}
                                        label={translate(setting.key)}
                                        checked={values[setting.key] || false}
                                        onChange={handleChange}
                                    />
                                </Col>
                            );
                        })}
                </Row>
                <Button className="mt-3" onClick={handleSubmit}>Update Privacy Settings</Button>
            </Form>
        </>
    );
}