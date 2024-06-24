export default function Reports({ display, incompleteRegistrations }) {
    return (
        <>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Reports</h1>
                <p>Incomplete Registrations | Registered Users By Month</p>
                <br /><br />
                <h1>Incomplete Registrations</h1>
            </main>
        </>
    );
}