export default function Flash({type, message}) {
    return (
        <div className={`flash ${type}`}>
            { message }
        </div>
    );
}