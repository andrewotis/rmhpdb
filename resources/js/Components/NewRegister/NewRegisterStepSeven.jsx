import rfdc from "rfdc";
import ToggleSwitch from "../ToggleSwitch";

export default function NewRegisterStepSeven({ values, setValues, display, adminSettings }) {
    const toggle = setting => {        
        setValues({
            ...rfdc()(values),
            privacy_settings: {
                ...values.privacy_settings,
                [setting]: !values.privacy_settings[setting]
            }
        });
    }
    
    return (
        <div className={!display ? 'display-none' : ''}>
            Choose which fields you would like to be set as private and see live preview above. These settings may be changed later in account settings.    
            <table style={{margin: 'auto', marginTop: '.75rem'}}>
                <tbody>
                    {
                        adminSettings.map(setting => {
                            return (
                                <tr key={setting}>
                                    <td>{setting.replace("_", " ")}</td>
                                    <td>
                                        <ToggleSwitch 
                                            checked={values.privacy_settings[setting]}
                                            onChange={() => toggle(setting)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}