import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function NewRegisterStepFour({ values, handleChange, display, setValues, categories }) {
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

    return (
        <div className={!display ? 'display-none' : ''}>
            <div className="text-align-center">
                Please confirm in which category (or categories) <br />you are capapble of making the assessment
            </div>
            <Select
                id="categories-select"
                isMulti
                options={options}
                onChange={e => setValues({...values, categories: e})}
            />
        </div>
    );
}