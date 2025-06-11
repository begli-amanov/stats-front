export default function Footer() {
    return (
        <footer className="flex justify-center items-center p-4 border-t-border">
            <p className="text-primary text-sm">
                &copy; {new Date().getFullYear()} League of Legends Stats. All rights reserved.
            </p>
        </footer>
    );
}