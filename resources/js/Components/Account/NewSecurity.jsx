export default function NewSecurity({display}) {
    return (
        <div className={`tab-content${!display ? ' display-none' : ''}`}>
            security
        </div>
    );
}