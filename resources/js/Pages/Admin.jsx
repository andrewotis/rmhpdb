import { useEffect, useState } from "react";
import { router, usePage, Link } from '@inertiajs/react';
import Users from "../Components/Admin/Users";
import FeedbackForm from "../Components/Admin/FeedbackForm";
import PrivacySettings from "../Components/Admin/PrivacySettings";
import Credentials from "../Components/Admin/Credentials";
import Sectors from "../Components/Admin/Sectors";
import Categories from "../Components/Admin/Categories";
import CreateAdmin from "../Components/Admin/CreateAdmin";
import UpdateAccount from "../Components/Admin/UpdateAccount";

export default function Admin({ auth, adminSettings, credentials, sectors, categories, users}) {
    const [activeTab, setActiveTab] = useState('users');
    const [sidebarActive, setSidebarActive] = useState(false);

    useEffect(() => {
        console.log(adminSettings); 
    },[]);

    return (
        <>
            <div className="admin">
                <div className={`menu-toggle${sidebarActive ? ' is-active' : ''}`} onClick={() => setSidebarActive(!sidebarActive)}>
                    <div className="hamburger">
                        <span></span>
                    </div>
                </div>

                <aside className={`sidebar${sidebarActive ? ' is-active' :''}`}>
                    <h3>RMHPdb Admin</h3>
                    <h2>{auth.email}</h2>
                    <h2><i>{auth.first_name} {auth.last_name}</i></h2>
                    
                    <nav className="menu">
                        <a onClick={() => setActiveTab('users')} className={`menu-item${(activeTab=='users' || activeTab=='createAdmin') ? ' is-active' : ''}`}>Users</a>
                        <a onClick={() => setActiveTab('feedbackForm')}  className={`menu-item${activeTab=='feedbackForm' ? ' is-active' : ''}`}>Feedback Form</a>
                        <a onClick={() => setActiveTab('privacySettings')}  className={`menu-item${activeTab=='privacySettings' ? ' is-active' : ''}`}>Privacy Settings</a>
                        <a onClick={() => setActiveTab('credentials')}  className={`menu-item${activeTab=='credentials' ? ' is-active' : ''}`}>Credentials</a>
                        <a onClick={() => setActiveTab('sectors')}  className={`menu-item${activeTab=='sectors' ? ' is-active' : ''}`}>Sectors</a>
                        <a onClick={() => setActiveTab('categories')}  className={`menu-item${activeTab=='categories' ? ' is-active' : ''}`}>Hazard Categories</a>
                        <a onClick={() => setActiveTab('updateAccount')}  className={`menu-item${activeTab=='updateAccount' ? ' is-active' : ''}`}>Update Account</a>
                        <Link href="/logout" className="menu-item">
                            Logout
                        </Link>
                    </nav>

                </aside>

                <Users 
                    display={activeTab == 'users'} 
                    users={users}
                    auth={auth}
                    setActiveTab={setActiveTab}
                    credentials={credentials}
                    categories={categories}
                    sectors={sectors}
                />
                <FeedbackForm 
                    display={activeTab == 'feedbackForm'}
                    adminSettings={adminSettings}
                />
                <PrivacySettings 
                    display={activeTab == 'privacySettings'}
                    adminSettings={adminSettings}
                />
                <Credentials 
                    display={activeTab == 'credentials'}
                    credentials={credentials}
                />
                <Sectors 
                    display={activeTab == 'sectors'}
                    sectors={sectors}
                />
                <Categories 
                    display={activeTab == 'categories'}
                    categories={categories}
                />
                <CreateAdmin 
                    display={activeTab == 'createAdmin'}
                    setActiveTab={setActiveTab}
                />
                <UpdateAccount
                    display={activeTab == 'updateAccount'}
                    auth={auth}
                />
            </div>
        </>
    );
}