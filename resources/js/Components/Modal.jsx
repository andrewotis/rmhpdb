export default function Modal({display, close, children }) {
    return (
        <>
            <div id="myModal" className="modal" style={{display: display ? 'block' : 'none'}}>
                <div className="modal-content">
                    <span 
                        className="close"
                        onClick={close}
                    >
                        &times;
                    </span>
                    { children }
                </div>
            </div>
        </>
    )
}