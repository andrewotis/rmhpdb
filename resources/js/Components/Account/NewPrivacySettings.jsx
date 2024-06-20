import { useRef, useEffect, useState } from "react";
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
        <>
        <div className={`${!display ? 'display-none' : ''}`}>
            <div className={`tab-content`}>
                Please choose which fields you would like to set as private. Above is a live preview of how your record will be displayed.
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
        </div>
        
        </>
    );
}