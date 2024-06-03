import { useState } from 'react'
import Layout from "../Layouts/Layout";
import { Container, Nav } from 'react-bootstrap';
import AdminUserPrivacy from '../Components/AdminUserPrivacy';
import AdminFeedbackSettings from '../Components/AdminFeedbackSettings';

export default function Admin({ auth, settings }) {
    const [activeTab, setActiveTab] = useState('privacy');

    return (
        <Layout auth={auth}>
            <Container>
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={() => setActiveTab('privacy')}>User Privacy</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setActiveTab('feedback')}>Feedback Settings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link disabled onClick={() => setActiveTab('credentials')}>Credentials</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link disabled onClick={() => setActiveTab('sectors')}>Sectors</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link disabled onClick={() => setActiveTab('categories')}>Categories</Nav.Link>
                    </Nav.Item>
                </Nav>
                <AdminUserPrivacy 
                    display={activeTab == 'privacy'} 
                    settings={settings} 
                />
                <AdminFeedbackSettings
                    display={activeTab == 'feedback'}
                    settings={settings}
                />
            </Container>
        </Layout>
    );
}