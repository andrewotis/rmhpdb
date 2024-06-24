import { useState, useEffect } from "react";
import { router, usePage, Link } from '@inertiajs/react';
import Modal from "../Modal";
import Flash from "../Flash";
import { BoxIconElement } from "boxicons";
import { prettifyDate } from '../../tools';


export default function Users({ display, users, auth, setActiveTab, credentials, categories, sectors }) {
    const [error, setError] = useState('');
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState({
        type: '',
        user: {}
    });
    const [filtered, setFiltered] = useState(users);
    const [filterTerms, setFilterTerms] = useState({
        name: '',
        email: '',
        company: '',
        type: '',
        active: ''
    });

    const formatCategories = arr => {
        let c = [];
        arr.map(a => {
            c.push(categories.filter(cat => cat.id == a.value)[0].category)
        });
        return c.join(', ');
    }

    const formatSectors = arr => {
        let c = [];
        arr.map(a => {
            c.push(sectors.filter(cat => cat.id == a.value)[0].naics_code)
        });
        return c.join(', ');
    }

    const formatCredentials = arr => {
        let c = [];
        arr.map(a => {
            c.push(credentials.filter(cat => cat.id == a.value)[0].credential)
        });
        return c.join(', ');
    }

    const filterData = _ => {
        const f = users.filter(user => {
            return (
                user.first_name.toLowerCase().includes(filterTerms.name.toLowerCase()) || 
                user.last_name.toLowerCase().includes(filterTerms.name.toLowerCase())
            ) &&
                user.email.toLowerCase().includes(filterTerms.email.toLowerCase()) &&
                    user.type.includes(filterTerms.type)
        });

        let co = [];
        f.map(user => {
            if(filterTerms.company !== '') {
                if(user.company !== null && user.company.toLowerCase().includes(filterTerms.company.toLowerCase())) {
                    co.push(user);
                }
            } else {
                co.push(user);
            }
        });

        let ar = [];
        co.map(user => {
            if((filterTerms.active == true && user.active == 1) || filterTerms.active == "") {
                ar.push(user);
            } else if(filterTerms.active == false && user.active == 0) {
                ar.push(user);
            }
        })
        setFiltered(ar);
    }

    useEffect(() => {
        if(JSON.stringify(action) !== JSON.stringify({
            type: '',
            user: {}
        })) {
            setShowModal(true);
        }        
    }, [action]);

    useEffect(() => {
        filterData();    
    },[filterTerms, users]);

    const modalContent = () => {
        if(action.type == 'status') {
            return (
                <>
                    <p>Are you sure you wish to {action.user.active == '0' ? 'activate' : 'deactivate'} user {action.user.email}?</p>
                    <button
                        onClick={() => handleActionSubmit()}
                    >
                        Yes
                    </button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </>
            );
        } else if(action.type == 'password') {
            return (
                <>
                    <p>Are you sure you wish to reset the password for user {action.user.email}?</p>
                    <button
                        onClick={() => handleActionSubmit()}
                    >
                        Yes
                    </button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </>
            );
        } else if(action.type == 'view') {
            return (
                <>
                    <table style={{margin: 'auto'}}>
                        <tr>
                            <td style={{textAlign: 'right'}}>ID</td>
                            <td style={{textAlign: 'left'}}>{action.user.id}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>First Name</td>
                            <td style={{textAlign: 'left'}}>{action.user.first_name}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Last Name</td>
                            <td style={{textAlign: 'left'}}>{action.user.last_name}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Email</td>
                            <td style={{textAlign: 'left'}}>{action.user.email}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Company</td>
                            <td style={{textAlign: 'left'}}>{action.user.company}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Reg. #</td>
                            <td style={{textAlign: 'left'}}>{action.user.registration_number}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Address 1</td>
                            <td style={{textAlign: 'left'}}>{action.user.address_one}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Active</td>
                            <td style={{textAlign: 'left'}}>{action.user.active}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Address 2</td>
                            <td style={{textAlign: 'left'}}>{action.user.address_two}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Registration Date</td>
                            <td style={{textAlign: 'left'}}>{prettifyDate(action.user.created_at)}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>City</td>
                            <td style={{textAlign: 'left'}}>{action.user.city}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Last Updated</td>
                            <td style={{textAlign: 'left'}}>{prettifyDate(action.user.updated_at)}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>State</td>
                            <td style={{textAlign: 'left'}}>{action.user.state}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Credentials</td>
                            <td style={{textAlign: 'left'}}>{formatCredentials(action.user.credentials)}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Zip</td>
                            <td style={{textAlign: 'left'}}>{action.user.zip}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Hazard Categories</td>
                            <td style={{textAlign: 'left'}}>{formatCategories(action.user.categories)}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Sectors</td>
                            <td style={{textAlign: 'left'}}>{formatSectors(action.user.sectors)}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Country</td>
                            <td style={{textAlign: 'left'}}>{action.user.country}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'right'}}>Phone</td>
                            <td style={{textAlign: 'left'}}>{action.user.phone_number}</td>
                        </tr>
                    </table>
                    <br /><button onClick={() => setShowModal(false)}>Close</button>
                </>
            );
        }
    }

    const handleActionSubmit = _ => {
        switch(action.type) {
            case 'password':
                router.put(`/admin/password/reset/${action.user.id}`);
                break;
            case 'status':
                router.put(`/admin/status/update/${action.user.id}`);
                break;
        }
        
        setShowModal(false);
    }

    const handleActionClick = (type, user) => {
        if(user.id == auth.id) {
            setError("You can not perform actions on your own account.");
        } else {
            setAction({
                type: type,
                user: user
            });
        }        
    }

    return (
        <>
            <Modal 
                display={showModal}
                close={() => setShowModal(false)}
            >
                { modalContent() }
            </Modal>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Users</h1>
                <p>In the actions column, use the magnifier icon to view a user's details. The x icon disables a user's account. Disabled accounts will 
                    still be in the system but the user can not log in and will not be displayed in the public database. In case a user forgets their password AND loses access
                    to their email account, use the lock icon to reset their password. A strong temporary password will be generated for them and displayed just above the table below.
                </p>
                <button
                    onClick={() => setActiveTab('createAdmin')}
                >
                    Create Admin Account
                </button>
                { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
                { error != '' && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={error}/></div> }
                <table className="admin-users-table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>email</td>
                            <td>company</td>
                            <td>type</td>
                            <td>reg. #</td>
                            <td>active</td>
                            <td>actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><input type="text" onChange={e => setFilterTerms({...filterTerms, name: e.target.value})} placeholder="Filter" /></td>
                            <td><input type="text" onChange={e => setFilterTerms({...filterTerms, email: e.target.value})} placeholder="Filter" /></td>
                            <td><input type="text" onChange={e => setFilterTerms({...filterTerms, company: e.target.value})} placeholder="Filter" /></td>
                            <td>
                                <select onChange={e => setFilterTerms({...filterTerms, type: e.target.value})}>
                                    <option value="">Filter</option>
                                    <option value="admin">Admin</option>
                                    <option value="registered_mhp">Registered MHP</option>
                                </select>
                            </td>
                            <td />
                            <td>
                                <select onChange={e => setFilterTerms({...filterTerms, active: e.target.value})}>
                                    <option value="">Filter</option>
                                    <option value="1">Active</option>
                                    <option value="0">Not Active</option>
                                </select>
                            </td>
                            <td />
                        </tr>
                        {
                            filtered && filtered.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.last_name}, {user.first_name}</td>
                                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>{user.company}</td>
                                        <td>{user.type}</td>
                                        <td>{user.registration_number}</td>
                                        <td>{user.active ? 'true' : 'false'}</td>
                                        <td>
                                            <box-icon 
                                                type='solid' 
                                                name='lock-open' 
                                                onClick={() => handleActionClick('password', user)}
                                            />
                                            <box-icon 
                                                name='search-alt'
                                                onClick={() => handleActionClick('view', user)}
                                            />
                                            { 
                                                user.active ?
                                                    <box-icon 
                                                        type='solid' 
                                                        name='message-square-x' 
                                                        onClick={() => handleActionClick('status', user)}
                                                    /> : 
                                                        <box-icon 
                                                            name='message-square-add' 
                                                            type='solid'
                                                            onClick={() => handleActionClick('status', user)}
                                                        /> 
                                            }                                            
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}