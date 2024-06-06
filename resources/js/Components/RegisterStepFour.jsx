import { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterStepFour({ values, setValues, display, categories }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let o = [];
        categories.map(category => {
            o.push({
                value: category.id,
                label: category.category
            });
        });
        setOptions(o)
    }, [categories]);

    const getColSize = _ => ({ span: 4, offset: 4 })

    return (
        <Container className={`${!display ? 'd-none' : ''} mb-3`}>
            <Row>
                <Col lg={getColSize()} className="text-center fs-5 mb-3">
                    Please confirm in which category (or categories) you are capapble of making the assessment<br />
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <Select
                        id="categories-select"
                        isMulti
                        options={options}
                        onChange={e => setValues({...values, categories: e})}
                    />
                </Col>
            </Row>
        </Container>
    );
}
