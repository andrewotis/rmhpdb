import { useState, useEffect } from 'react'
import Layout from "../Layouts/Layout";
import { prettifyDate } from '../tools';
import { Table, Pagination, Row, Col, Form, Container } from 'react-bootstrap';

export default function IdeaTwo({ auth, users, credentials, sectors, categories }) {
    const [sorted, setSorted] = useState(users);
    const [filtered, setFiltered] = useState(users);
    const [filterTerms, setFilterTerms] = useState({
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        country: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);

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
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    useEffect(() => {
        const arr = [...sorted].filter(row => {
            return row.first_name.toLowerCase().includes(filterTerms.first_name.toLowerCase()) &&
                row.last_name.toLowerCase().includes(filterTerms.last_name.toLowerCase()) &&
                row.city.toLowerCase().includes(filterTerms.city.toLowerCase()) &&
                row.state.toLowerCase().includes(filterTerms.state.toLowerCase()) &&
                row.country.toLowerCase().includes(filterTerms.country.toLowerCase()) 
        });
        setFiltered(arr);
    },[filterTerms]);

    const handleFilter = e => {
        const id = e.target.id.replace('search-', '');
        setFilterTerms()
        /*
        const arr = [...sorted].filter(row => row[id].toLowerCase().includes(e.target.value.toLowerCase()));
        const arr = [...sorted].filter(row => {
            
        });
        setFiltered(arr);
        */
    }

    return (
        <Layout auth={auth}>
            <Row className="align-items-end mb-2">
                <Col sm="8" className="" >
                    <Pagination size="sm">
                        <Pagination.First onClick={() => setCurrentPage(1)}/>
                        <Pagination.Prev onClick={() => currentPage !== 1 && setCurrentPage(currentPage-1)}/>
                        {items}
                        <Pagination.Next onClick={() => currentPage !== numberOfPages && setCurrentPage(currentPage+1)}/>
                        <Pagination.Last onClick={() => setCurrentPage(numberOfPages)}/>
                    </Pagination>
                </Col>
                <Col sm="2">
                    {indexOfFirstRow+1}-{indexOfLastRow > sorted.length ? sorted.length : indexOfLastRow} of {sorted.length}<br />
                </Col>
                <Col sm="2" className="text-align-right">
                    <Form.Select
                        size="sm"
                        onChange={(e) => {
                            if(e.target.value !== "null"){
                                setRowsPerPage(e.target.value);
                                setCurrentPage(1);
                            }
                        }}
                    >
                        <option value="null">Results per page</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </Form.Select>
                </Col>
            </Row>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td colspan="11">
                            <Row>
                                <Col lg="2">
                                    Filter Results:
                                </Col>
                                <Col lg="2">
                                    <input onChange={(e) => setFilterTerms({...filterTerms, [e.target.id] : e.target.value})} placeholder="First Name" id="first_name" type="text" />
                                </Col>
                                <Col lg="2">
                                    <input onChange={(e) => setFilterTerms({...filterTerms, [e.target.id] : e.target.value})} placeholder="Last Name" id="last_name" type="text" />
                                </Col>
                                <Col lg="2">
                                    <input onChange={(e) => setFilterTerms({...filterTerms, [e.target.id] : e.target.value})} placeholder="City" id="city" type="text" />
                                </Col>
                                <Col lg="2">
                                    <input onChange={(e) => setFilterTerms({...filterTerms, [e.target.id] : e.target.value})} placeholder="State" id="state" type="text" />
                                </Col>
                                <Col lg="2">
                                    <input onChange={(e) => setFilterTerms({...filterTerms, [e.target.id] : e.target.value})} placeholder="Country" id="country" type="text" />
                                </Col>
                            </Row>
                        </td>
                    </tr>
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
                    {currentRows.map(user => {
                        return (
                            <tr key={user.id}>
                                <td >{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.company}</td>
                                <td>
                                    {user.address} <br />
                                    {user.address2 && <>{user.address2}<br /></>}
                                    {user.city}, {user.state} {user.zip}<br/>
                                    {user.country}
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