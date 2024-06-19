import FloatingLabelInput from './../FloatingLabelInput';
import { maskPhoneNumber } from './../../tools';

export default function NewRegisterStepTwo({ values, handleChange, display, setValues }) {
    const filterNumbers = e => {
        const formatted = maskPhoneNumber(e.target.value);

        setValues(values => ({
            ...values,
            phone_number: formatted
        }));
    }

    return (
        <div className={!display ? 'display-none' : ''}>
            <FloatingLabelInput 
                name="company"
                label="Company"
                value={values.company}
                onChange={handleChange}
            />
            <FloatingLabelInput 
                name="phone_number"
                label="Phone Number"
                value={values.phone_number}
                onChange={filterNumbers}
            />
        </div>
    );
}