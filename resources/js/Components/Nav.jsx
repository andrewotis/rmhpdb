
import { useState } from "react";
import { Link } from '@inertiajs/react';

export default function Nav({ auth, children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <i className="fa fa-heartbeat fa-4x" />
            <span className="nav-logo-text">RMHPdb</span>
            <div className="nav-links" id="navLinks" style={{
                right: menuOpen ? '0' : '-200px'
            }}>
                <i className="fa fa-times fa-rm" onClick={() => setMenuOpen(false)} />
                <ul>
                    <li>
                        <Link href="/">
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            ABOUT
                        </Link>
                    </li>
                    <li>
                        <Link href="/database">
                            DATABASE
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            CONTACT
                        </Link>
                    </li>
                    <li>
                        {
                            auth == null
                                ?
                                    <Link href="/#register">
                                        REGISTER
                                    </Link>
                                :
                                    <Link href="/account">
                                        ACCOUNT
                                    </Link>
                        }
                    </li>
                    <li>
                        {
                            auth == null 
                                ?
                                    <Link href="/login">
                                        LOGIN
                                    </Link>
                                :
                                    <Link href="/logout">
                                        LOGOUT
                                    </Link>
                        }
                    </li>
                </ul>
            </div>
            <i className="fa fa-bars fa-rm" onClick={() => setMenuOpen(true)} />
        </nav>
    );
}