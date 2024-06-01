import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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

    return (
        <Container className={`${!display ? 'd-none' : ''}`}>
            Please indicate to which industry sector you are capable of making the assessment<br />
            <Container className="w-50 mb-3">
                <Select
                    id="sectors-select"
                    isMulti
                    options={options}
                    onChange={e => setSectorsValues(e)}
                />
            </Container>
        </Container>
    );
}