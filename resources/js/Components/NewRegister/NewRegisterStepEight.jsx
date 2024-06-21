export default function NewRegisterStepEight({ values, display, tokenRecord }) {
    const formatPrivateFields = _ => {
        let arr = [];
        Object.entries(values.privacy_settings).map(a => {
            if(a[1]) arr.push(a[0]);
        });
        return arr.join(", ")
    }

    return (
        <div className={!display ? 'display-none' : ''}>
            <table style={{margin: 'auto'}}>
                <tbody>
                    <tr>
                        <td className="font-weight-bold">Name</td>
                        <td>
                            {tokenRecord.first_name} {tokenRecord.last_name}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Email</td>
                        <td>
                            {tokenRecord.email}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Address</td>
                        <td>
                            {values.address}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Address 2</td>
                        <td>
                            {values.address2}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">City</td>
                        <td>
                            {values.city}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">State</td>
                        <td>
                            {values.state}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Zip</td>
                        <td>
                            {values.zip}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Country</td>
                        <td>
                            {values.country}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Company</td>
                        <td>
                            {values.company}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Phone Number</td>
                        <td>
                            {values.phone_number}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Credentials</td>
                        <td>
                            {values.credentials.map(c => <>{c.label}<br /></>)}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Categories</td>
                        <td>
                            {values.categories.map(c => <>{c.label}<br /></>)}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Industry Sectors</td>
                        <td>
                            {values.sectors.map(c => <>{c.label}<br /></>)}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-weight-bold">Private Fields</td>
                        <td>
                            {
                                formatPrivateFields()
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}