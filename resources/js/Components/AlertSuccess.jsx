import { Alert, Row, Col } from 'react-bootstrap';

export default function AlertSuccess({ flash }) {
    const getColSize = _ => ({ span: 4, offset: 4 })
    
    return (
        flash.message && 
        <Row>
            <Col lg={getColSize()}>
                <Alert variant="success">
                    { flash.message }
                </Alert>
            </Col>
        </Row>        
    );
}
