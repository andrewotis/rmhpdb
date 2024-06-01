import { useState } from 'react'
import Layout from "../Layouts/Layout";
import { prettifyDate } from '../tools';
import Table from 'react-bootstrap/Table';

export default function SearchResults({ auth, users, credentials, sectors, categories }) {
    const [sorted, setSorted] = useState(users);

    const sortResults = (by) => {
        const arr = [...sorted].sort((a, b) => a[by].localeCompare(b[by]))
             
        setSorted(arr)
    }

    const formatCategories = arr => {
        let c = [];
        arr.map(a => {
            c.push(categories.filter(cat => cat.id == a.value)[0].category)
        });
        return c.join(', ')
    }

    const formatSectors = arr => {
        let c = [];
        arr.map(a => {
            c.push(sectors.filter(cat => cat.id == a.value)[0].naics_code)
        });
        return c.join(', ')
    }

    const formatCredentials = arr => {
        let c = [];
        arr.map(a => {
            c.push(credentials.filter(cat => cat.id == a.value)[0].credential)
        });
        return c.join(', ')
    }

    return (
        <Layout auth={auth}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th onClick={() => sortResults('first_name')}>First Name</th>
                        <th onClick={() => sortResults('last_name')}>Last Name</th>
                        <th onClick={() => sortResults('company')}>Company</th>
                        <th onClick={() => sortResults('address')}>Address</th>
                        <th onClick={() => sortResults('phone_number')}>Phone</th>
                        <th onClick={() => sortResults('email')}>Email</th>
                        <th>Category</th>
                        <th>Sector(s)</th>
                        <th>Credentials</th>
                        <th>Registration Date</th>
                        <th>Registration Number</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.company}</td>
                                <td>
                                    {user.address} <br />
                                    {user.address2 && <>{user.address2}<br /></>}
                                    {user.city}, {user.state} {user.zip} {user.country}
                                </td>
                                <td>{user.phone_number}</td>
                                <td>{user.email}</td>
                                <td>{formatCategories(user.categories)}</td>
                                <td>{formatSectors(user.sectors)}</td>
                                <td>{formatCredentials(user.credentials)}</td>
                                <td>{prettifyDate(user.created_at)}</td>
                                <td>{user.registration_number}</td>
                            </tr>
                        )                
                    })}
                </tbody>
            </Table>
        </Layout>
    );
}