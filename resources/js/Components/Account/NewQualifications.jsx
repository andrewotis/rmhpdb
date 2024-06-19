import FloatingLabelInput from '../FloatingLabelInput';
import Select from 'react-select';

export default function NewQualifications({display, values, setValues, credentials, categories, sectors}) {
    return (
        <div className={`tab-content${!display ? ' display-none' : ''}`}>
            <FloatingLabelInput
                name="registration_number"
                value={values.registration_number}
                label="Registration Number:"
                filled
                disabled
            />
            Credentials:
            <Select
                id="credselect"
                isMulti
                options={credentials}
                onChange={e => setValues({...values, credentials: e})}
                value={values.credentials}
            />
            Sectors:
            <Select
                id="sectorselect"
                isMulti
                options={sectors}
                onChange={e => setValues({...values, sectors: e})}
                value={values.sectors}
            />
            Hazard Categories:
            <Select
                id="catselect"
                isMulti
                options={categories}
                onChange={e => setValues({...values, categories: e})}
                value={values.categories}
            />
        </div>
    );
}