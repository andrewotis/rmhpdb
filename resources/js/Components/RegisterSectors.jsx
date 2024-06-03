import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterSectors({ display, stepsInfoValid, setStepsInfoValid, sectorsValues, setSectorsValues, sectors }) {
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

    useEffect(() => {
        if(sectorsValues.length > 0) {
            setStepsInfoValid({...stepsInfoValid, four: true});
        } else {
            setStepsInfoValid({...stepsInfoValid, four: false});
        }
    }, [sectorsValues]);

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    return (
        <Container className={`${!display ? 'd-none' : ''} mb-4`}>
            <Row>
                <Col lg={getColSize()} className="text-center fs-5 mb-3">
                    Please indicate to which industry sector you are capable of making the assessment<br />
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <Select
                        id="sectors-select"
                        isMulti
                        options={options}
                        onChange={e => setSectorsValues(e)}
                    />
                </Col>
            </Row>
        </Container>
    );
}