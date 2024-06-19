import ToggleSwitch from "../ToggleSwitch";
import rfdc from 'rfdc';

export default function NewPrivacySettings({display, values, setValues, adminSettings}) {
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
        <div className={`tab-content${!display ? ' display-none' : ''}`}>
            Please choose which fields you would like to set as private. Private fields will not be shown on the public database.
            <table style={{margin: 'auto'}}>
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