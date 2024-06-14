
import { useState } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";

export default function LayoutFour({ auth, children, title, noPaddingUnderHeader=false }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
           <div className="sub-header">
                <Nav auth={auth} />
                <h1>{title}</h1>
           </div>
           <div className={`main-content${noPaddingUnderHeader ? ' no-padding' : ''}`}>
                {children}
           </div>
           <Footer />
        </>
    );
}