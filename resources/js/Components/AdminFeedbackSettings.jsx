import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react';
import { validate } from 'email-validator';
import { Container, Table, Form, Button, Row, Col, Nav, FloatingLabel} from 'react-bootstrap';

export default function AdminFeedbackSettings({ auth, settings, display }) {
    const [recipients, setRecipients] = useState([]);
    const [addNewRecipient, setAddNewRecipient] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        router.post('/admin/feedback', {email: addNewRecipient});
    }

    useEffect(() => {
        let a = [];
        settings.map(setting => {
            if(setting.type == 'feedback_recipient' && setting.key == 'email_address') {
                a.push(setting.value);
            }
        });
        setRecipients(a);
    },[settings]);

    const removeAddress = email => {
        router.delete(`/admin/feedback/${email}`);
    }

    return (
        <Container className={!display ? 'd-none' : ''}>
            <Row>
                <Col lg={ {span: 6, offset: 3} }>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Feedback Form Recipient(s):</th>
                            </tr>
                        </thead>
                        <tbody>
                            { recipients.map(recipient => <tr key={recipient}><td>{recipient} <div className="ms-3 d-inline cursor-pointer" onClick={() => removeAddress(recipient)}>REMOVE</div></td></tr>) }
                            <tr>
                                <td>
                                    <Row>
                                        <Col lg="9">
                                            <Form.Control 
                                                type="email" 
                                                placeholder="add@newrecipienthere.com" 
                                                value={addNewRecipient}
                                                onChange={(e => setAddNewRecipient(e.target.value))}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Button 
                                                className="w-100"
                                                disabled={!validate(addNewRecipient)}
                                                onClick={handleSubmit}
                                            >
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            

        </Container>
    );
}