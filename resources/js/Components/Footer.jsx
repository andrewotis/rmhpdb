import { useEffect, useState } from "react";

export default function Footer({ children }) {
    const [year, setYear] = useState(undefined);
    useEffect(() => {
        const d = new Date();
        setYear(d.getFullYear());
    },[]);

    return (
        <>
            <div className="footer">
                &copy; {year} RMHP
            </div>
        </>
    );
}