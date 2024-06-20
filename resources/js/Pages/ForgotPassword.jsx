import { useState } from "react";
import LayoutFour from "../Layouts/LayoutFour";
import FloatingLabelInput from "../Components/FloatingLabelInput";
import Button from "../Components/Button";
import { validate } from 'email-validator';
import { router, usePage } from '@inertiajs/react';
import Flash from "../Components/Flash";

export default function ForgotPassword({}) {
    const { flash } = usePage().props;
    const { errors } = usePage().props;

    const [email, setEmail] = useState('');

    const handleSubmit = _ => {
        router.post('/account/password/forgot', {email: email});
    }
    
    return (
        <LayoutFour title="Forgot Password">
            { flash.message && <Flash type="success" message={flash.message}/> }
            { errors.error && <Flash type="error" message={errors.error}/> }
            <div className="registration-container flex-direction-col">
                Let us know your email address and we'll send you a reset link.<br /><br />
                <form className="registration-form">
                    <FloatingLabelInput
                        name="email"
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button
                        filled
                        onClick={validate(email) ? handleSubmit : undefined}
                        disabled={!validate(email)}
                    >
                        Get Reset Link
                    </Button>
                </form>
            </div>
        </LayoutFour>
    );
}