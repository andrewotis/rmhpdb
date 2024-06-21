import { useEffect, useState } from "react";


export default function Admin({ auth, adminSettings, credentials, sectors, categories }) {
    const [activeTab, setActiveTab] = useState('credentials');
    const [sidebarActive, setSidebarActive] = useState(false);

    useEffect(() => {
        // document.body.style = 'background: #9c88ff';
    },[]);

    return (
        <>
        </>
    );
}