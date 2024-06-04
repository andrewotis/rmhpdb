import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Container, Form, Button, Row, Col, Table } from 'react-bootstrap';

export default function AdminCredentials({ auth, settings, display, credentials }) {
    const [newCredential, setNewCredential] = useState({
        credential: '',
        description: ''
    });

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/admin/credentials', newCredential);
    }

    return (
        <Container className={!display ? 'd-none' : ''}>                        
            <Row>
                <Col lg={ {span: 6, offset: 3} }>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Credential</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                credentials.map(credential => {
                                    return (
                                        <tr>
                                            <td>
                                                { credential.credential }
                                            </td>
                                            <td>
                                                { credential.description }
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            <tr>
                                <td colSpan={2}>
                                    <Row>
                                        <Col lg="3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Initials" 
                                                id="credential"
                                                value={newCredential.credential}
                                                onChange={(e) => setNewCredential({...newCredential, credential: e.target.value})}
                                            />
                                        </Col>
                                        <Col lg="6">
                                            <Form.Control 
                                                type="text" 
                                                id="description"
                                                placeholder="Description..."
                                                value={newCredential.description}
                                                onChange={(e) => setNewCredential({...newCredential, description: e.target.value})}
                                            />
                                        </Col>
                                        <Col lg="3">
                                            <Button
                                                className="w-100"
                                                disabled={newCredential.credential.length < 1 || newCredential.description.length < 5}
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