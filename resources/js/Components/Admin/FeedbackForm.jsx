import { useState, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';
import { validate } from 'email-validator';
import Flash from "../Flash";
import Modal from "../Modal";
import { BoxIconElement } from "boxicons";

export default function FeedbackForm({ display, adminSettings, setFlashMessageSeen, flashMessageSeen, setErrorMessageSeen, errorMessageSeen }) {
    const [showModal, setShowModal] = useState(false);
    const [activeSetting, setActiveSetting] = useState({});
    const [email, setEmail] = useState('');
    const { errors } = usePage().props;
    const { flash } = usePage().props;

    useEffect(() => {
        setFlashMessageSeen(false);
    },[flash.message]);

    useEffect(() => {
        setErrorMessageSeen(false);
    },[errors.error]);


    const handleSubmit = e => {
        e.preventDefault();
        router.post("/admin/feedback", {email: email});
    }

    const handleDelete = _ => {
        router.delete(`/admin/feedback/${activeSetting.id}`);
        setShowModal(false);
    }

    const modalContent = _ => {
        return (
            <>
                <p>Are you sure you wish to remove {activeSetting.value} from receiving feedback submissions?</p>
                <button
                    onClick={() => handleDelete()}
                >
                    Yes
                </button>
                <button
                    onClick={() => setShowModal(!showModal)}
                >
                    Cancel
                </button>
            </>
        );
    }

    const handleActionClick = setting => {
        setActiveSetting(setting);
        setShowModal(true);
    }

    return (
        <>
            <Modal 
                display={showModal}
                close={() => setShowModal(false)}
            >
                { modalContent() }
            </Modal>
            <main className={`content${!display ? ' display-none' : ''}`}>
                <h1>Feedback Form</h1>
                <p>Manage feedback form recipients.</p>
                { flash.message && !flashMessageSeen && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
                { errors.error && !errorMessageSeen && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
                <table style={{backgroundColor: "#fff", width: '400px', marginTop: "1rem"}}>
                    <tbody>
                        {
                            adminSettings && adminSettings.map(setting => {
                                if(setting.type == 'feedback_recipient') {
                                    return (
                                        <tr key={setting.id}>
                                            <td>{ setting.value } <box-icon size="sm" onClick={() => handleActionClick(setting)} name='checkbox-minus' type="solid"/></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                    <input type="text" style={{width: '400px', padding: '5px'}} onChange={e => setEmail(e.target.value)} placeholder="Email address..." /> 
                    <button
                        style={{marginLeft: '10px' , padding: '5px'}}
                        disabled={!validate(email)}
                        type="submit"
                    >
                        add
                    </button>
                </form>
            </main>
        </>
    )
}