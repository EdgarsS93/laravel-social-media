import {Link} from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function Home() {
    return (
        <AppLayout>
            <h1>Home page</h1>
            <p>Welcome to Homepage</p>
            <Link href="/about">About</Link>
        </AppLayout>
    );
}
