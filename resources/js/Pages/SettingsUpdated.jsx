import Layout from "../Layouts/Layout";

export default function SettingsUpdated({ auth, settings }) {
    return (
        <Layout auth={auth}>
            Settings have been updated.
        </Layout>
    );
}