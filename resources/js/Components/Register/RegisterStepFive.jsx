import { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterStepFive({ values, setValues, display, sectors }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let o = [];
        sectors.map(sector => {
            o.push({
                value: sector.id,
                label: `${sector.nora_sector_group} (NAICS ${sector.naics_code})`
            });
        });
        setOptions(o)
    },[sectors]);

    const getColSize = _ => ({ span: 4, offset: 4 })

    return (
        <Container className={`${!display ? 'd-none' : ''} mb-3`}>
            <Row>
                <Col lg={getColSize()} className="text-center fs-5 mb-3">
                    Please indicate to which industry sector you are capable of making the assessment<br />
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <Select
                        id="categories-select"
                        isMulti
                        options={options}
                        onChange={e => setValues({...values, sectors: e})}
                    />
                </Col>
            </Row>
        </Container>
    );
}
