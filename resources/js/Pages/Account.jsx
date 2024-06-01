import Layout from "../Layouts/Layout";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AccountDetails from "../Components/AccountDetails";
import AccountPassword from "../Components/AccountPassword";
import AccountPrivacy from "../Components/AccountPrivacy";

export default function Account({auth, adminSettings, privacySettings}) {
  return (
    <Layout auth={auth}>
        <Tabs
            defaultActiveKey="account"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="account" title="Account Details">
                <AccountDetails auth={auth}/>
            </Tab>
            <Tab eventKey="password" title="Update Password">
                <AccountPassword auth={auth} />
            </Tab>
            <Tab eventKey="privacy" title="Privacy Settings">
                <AccountPrivacy auth={auth} adminSettings={adminSettings} privacySettings={privacySettings}/>
            </Tab>
        </Tabs>
    </Layout>
  );
}