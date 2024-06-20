import { prettifyDate } from '../../tools';
import { transformCredentialsForPreview, transformSectorsForPreview, transformCategoriesForPreview } from '../../transformTools';

export default function LivePrivacySettingsPreview({adminSettings, values, activeTab, credentials, sectors, categories}) {
    const settingIsAllowed = field => {
        const setting = adminSettings.find(setting => setting.key == field);
        return setting.value == "true";
    }

    return (
                <div className="privacy-live-preview-wrapper">
                    <table className={`privacy-live-preview${activeTab !== 'privacySettings' ? ' display-none' : ''}`}>
                        <thead>
                            <tr>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Company</td>
                                <td>Address</td>
                                <td>City</td>
                                <td>State</td>
                                <td>Zip</td>
                                <td>Country</td>
                                <td>Phone</td>
                                <td>Email</td>
                                <td>Credentials</td>
                                <td>Sectors</td>
                                <td>Category</td>
                                <td>Registration Date</td>
                                <td>Registration #</td>
                            </tr>
                        </thead>
                        <tr>
                            <td>
                                {
                                    settingIsAllowed('first_name') ?
                                        (values.privacy_settings.first_name ? '**PRIVATE**' : values.first_name) :
                                            values.first_name
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('last_name') ?
                                        (values.privacy_settings.last_name ? '**PRIVATE**' : values.last_name) :
                                            values.last_name
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('company') ?
                                        (values.privacy_settings.company ? '**PRIVATE**' : values.company) :
                                            values.company
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('address') ? 
                                        (values.privacy_settings.address ? '**PRIVATE**' : values.address) :
                                            values.address
                                }<br />
                                {
                                    values.address2 !== '' &&
                                    (settingIsAllowed('address2') ?
                                        (values.privacy_settings.address2 ? '**PRIVATE**' : values.address2) :
                                            values.address2)
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('city') ?
                                        (values.privacy_settings.city ? '**PRIVATE**' : values.city) :
                                            values.city
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('state') ?
                                        (values.privacy_settings.state ? '**PRIVATE**' : values.state) :
                                            values.state
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('zip') ?
                                        (values.privacy_settings.zip ? '**PRIVATE**' : values.zip) :
                                            values.zip
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('country') ?
                                        (values.privacy_settings.country ? '**PRIVATE**' : values.country) :
                                            values.country
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('phone_number') ?
                                        (values.privacy_settings.phone_number ? '**PRIVATE**' : values.phone_number) :
                                            values.phone_number
                                }
                            </td>
                            <td>
                                {
                                    settingIsAllowed('email') ?
                                        (values.privacy_settings.email ? '**PRIVATE**' : values.email) :
                                            values.email
                                }
                            </td>
                            <td>{transformCredentialsForPreview(values.credentials, credentials)}</td>
                            <td>{transformSectorsForPreview(values.sectors, sectors)}</td>
                            <td>{transformCategoriesForPreview(values.categories, categories)}</td>
                            <td>{prettifyDate(values.created_at)}</td>
                            <td>{values.registration_number}</td>
                        </tr>
                    </table>
                </div>
    );
}