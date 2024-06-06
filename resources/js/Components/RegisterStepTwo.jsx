import { Form, Container, Col, Row, FloatingLabel } from 'react-bootstrap';

export default function RegisterStepTwo({ values, setValues, display }) {
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
        let formatted = '';
        
        switch(filtered.length) {
            case 0:
                formatted = '';
                break;
            case 1:
                formatted = '(' + filtered;
                break;
            case 2:
                formatted = '(' + filtered;
                break;
            case 3:
                formatted = '(' + filtered.substring(0,3)
                break;
            case 4:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,4)
                break;
            case 5:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,5)
                break;
            case 6:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6)
                break;
            case 7:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,7)
                break;
            case 8:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,8)
                break;
            case 9:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,9)
                break;
            default:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,10)
                break;
        }

        setValues(values => ({
            ...values,
            phone_number: formatted
        }));
    }

    return (
        <Container className={!display ? 'd-none' : ''}>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="company"
                        label="Company"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Company" 
                            id="company"
                            value={values.company}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="phone"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Phone Number" 
                            id="phone_number"
                            value={values.phone_number}
                            onChange={filterNumbers}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>
    );
}
