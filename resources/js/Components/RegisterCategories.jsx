import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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

    useEffect(() => {
        if(categoriesValues.length > 0) {
            setStepsInfoValid({...stepsInfoValid, three: true});
        } else {
            setStepsInfoValid({...stepsInfoValid, three: false});
        }
    }, [categoriesValues]);

    return (
        <Container className={`${!display ? 'd-none' : ''}`}>
            Please confirm in which category (or categories) you are capapble of making the assessment<br />
            <Container className="w-50 mb-3">
                <Select
                    id="categories-select"
                    isMulti
                    options={options}
                    onChange={e => setCategoriesValues(e)}
                />
            </Container>
        </Container>
    );
}