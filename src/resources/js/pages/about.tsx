import {Link} from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function About() {
    return (
        <AppLayout>
            <h1>About page</h1>
            <p>Welcome to About page</p>
            <Link href="/">Home</Link>
        </AppLayout>
    );
}
