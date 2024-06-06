import { Alert, Row, Col } from 'react-bootstrap';

export default function AlertError({ errors }) {
    const getColSize = _ => ({ span: 4, offset: 4 })
    
    return (
        errors.error && 
        <Row>
            <Col lg={getColSize()}>
                <Alert variant="danger">
                    { errors.error }
                </Alert>
            </Col>
        </Row>        
    );
}
