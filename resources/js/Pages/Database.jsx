import { useState, useEffect } from 'react';
import LayoutFour from '../Layouts/LayoutFour';
import { prettifyDate } from '../tools';

export default function Database({ auth, users, credentials, sectors, categories }) {
    const [sorted, setSorted] = useState(users);
    const [filtered, setFiltered] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [filter, setFilter] = useState('');

    const sortResults = (by) => {
        const arr = [...sorted].sort((a, b) => a[by].localeCompare(b[by]));
        setSorted(arr);
    }

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

    // pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filtered.slice(indexOfFirstRow, indexOfLastRow);
    const numberOfPages = Math.trunc(filtered.length / rowsPerPage) + (filtered.length % rowsPerPage !== 0 ? 1 : 0); // total results divided by results per page

    let items = [];
    for (let number = 1; number <= numberOfPages; number++) {
        items.push(
            <a key={number} className={number === currentPage ? 'active' : ''} onClick={() => setCurrentPage(number)}>
                {number}
            </a>,
        );
    }

    useEffect(() => {
        const arr = [...sorted].filter(row => {
            return (
                row.first_name.toLowerCase().includes(filter.toLowerCase()) ||
                row.last_name.toLowerCase().includes(filter.toLowerCase()) ||
                row.company.toLowerCase().includes(filter.toLowerCase()) ||
                row.address.toLowerCase().includes(filter.toLowerCase()) ||
                row.city.toLowerCase().includes(filter.toLowerCase()) ||
                row.state.toLowerCase().includes(filter.toLowerCase()) ||
                row.zip.toLowerCase().includes(filter.toLowerCase()) ||
                row.country.toLowerCase().includes(filter.toLowerCase()) ||
                row.email.toLowerCase().includes(filter.toLowerCase())
            );
        });
        setFiltered(arr);
        setCurrentPage(1);
    },[filter]);

    return (
        <LayoutFour title="Database" noPaddingUnderHeader auth={auth}>
            <div className="database-table-controls">
                <div className="col padding-left-4px">
                    Display&nbsp;<select 
                        onChange={(e) => {
                            setRowsPerPage(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>&nbsp;results
                </div>
                <div className="col">
                    <input 
                        type="text" 
                        placeholder="Filter data..."
                        onChange={e => setFilter(e.target.value)}
                        className="position-absolute right-4px"
                    />
                </div>
            </div>
            <div className="database-table-wrapper">
                <table className="database-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Company</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Country</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Credentials</th>
                            <th>Sectors</th>
                            <th>Category</th>
                            <th>Registration Date</th>
                            <th>Registration #</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentRows.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.company}</td>
                                        <td>
                                            { user.address }<br />
                                            { user.address2 !== '' ? <>{user.address2}<br /></> : ''}
                                        </td>
                                        <td>{ user.city }</td>
                                        <td>{ user.state }</td>
                                        <td>{ user.zip }</td>
                                        <td>{ user.country }</td>
                                        <td>{ user.phone_number }</td>
                                        <td>{ user.email }</td>
                                        <td>{ formatCredentials(user.credentials) }</td>
                                        <td>{ formatSectors(user.sectors) }</td>
                                        <td>{ formatCategories(user.categories) }</td>
                                        <td>{ prettifyDate(user.created_at) }</td>
                                        <td>{ user.registration_number }</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="database-table-controls">
                <div className="col padding-left-4px">
                    {indexOfFirstRow+1}-{indexOfLastRow > filtered.length ? filtered.length : indexOfLastRow} of {filtered.length}&nbsp;records
                </div>
                <div className="col">
                    <div className="pagination position-absolute right-4px">
                        <a onClick={() => setCurrentPage(1)}>&laquo;</a>
                        <a onClick={() => currentPage !== 1 && setCurrentPage(currentPage-1)}>&lsaquo;</a>
                        {items}
                        <a onClick={() => currentPage !== numberOfPages && setCurrentPage(currentPage+1)}>&rsaquo;</a>
                        <a onClick={() => setCurrentPage(numberOfPages)}>&raquo;</a>
                    </div>
                </div>
            </div>
        </LayoutFour>
    );
}