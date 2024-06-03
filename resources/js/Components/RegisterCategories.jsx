import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterCategories({ display, stepsInfoValid, setStepsInfoValid, categoriesValues, setCategoriesValues, categories }) {
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

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    useEffect(() => {
        if(categoriesValues.length > 0) {
            setStepsInfoValid({...stepsInfoValid, three: true});
        } else {
            setStepsInfoValid({...stepsInfoValid, three: false});
        }
    }, [categoriesValues]);

    return (
        <Container className={`${!display ? 'd-none' : ''} mb-4`}>
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
                        onChange={e => setCategoriesValues(e)}
                    />
                </Col>
            </Row>
        </Container>
    );
}