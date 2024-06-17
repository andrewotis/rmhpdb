import FloatingLabelInput from './../FloatingLabelInput';

export default function NewRegisterStepTwo({ values, handleChange, display, setValues }) {
    const filterNumbers = e => {
        const filtered = e.target.value.replace(/[^0-9]/g, '');
        let formatted = '';
        
        switch(filtered.length) {
            case 0:
                formatted = '';
                break;
            case 1:
                formatted = '(' + filtered;
                break;
            case 2:
                formatted = '(' + filtered;
                break;
            case 3:
                formatted = '(' + filtered.substring(0,3)
                break;
            case 4:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,4)
                break;
            case 5:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,5)
                break;
            case 6:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6)
                break;
            case 7:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,7)
                break;
            case 8:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,8)
                break;
            case 9:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,9)
                break;
            default:
                formatted = '(' + filtered.substring(0,3) + ') ' + filtered.substring(3,6) + '-' + filtered.substring(6,10)
                break;
        }

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