
import { Link } from '@inertiajs/react';
import RegisterSection from "../Components/RegisterSection";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Button from "../Components/Button";

export default function Home({ auth }) {
    return (
        <>
            <section className="header">
                <Nav auth={auth}/>

                <div className="text-box">
                    <h1>Registered Maternity Health Protector Database</h1>
                    <p>
                        Welcome to the Registered Maternity Health Protector database, where we are dedicated to managing risk to pregnant workers. Our mission is 
                        to create a vast database of individuals interested in managing risk to pregnant workers whom eventually seek to earn certification ultimately 
                        becoming Certified Maternity Health Protectors (CMHP).
                    </p>
                    <Link href="/database">
                        <Button>Browse Database</Button>
                    </Link>
                    <Link href="/search" replace>
                        <Button>Search Database</Button>
                    </Link>
                </div>
            </section>
            <div className="home-main-content">
                <a id="register" />
                <RegisterSection />
            </div>
            <Footer />
        </>
    );
}