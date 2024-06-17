import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function NewRegisterStepFive({ values, handleChange, display, setValues, sectors }) {
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

    return (
        <div className={!display ? 'display-none' : ''}>
            <div className="text-align-center">
                Please indicate to which industry sector you are <br />capable of making the assessment
            </div>
            <Select
                id="categories-select"
                isMulti
                options={options}
                onChange={e => setValues({...values, sectors: e})}
            />
        </div>
    );
}