export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-6">
      <p className="text-ring text-sm">
        &copy; {new Date().getFullYear()} League of Legends Stats. All rights
        reserved.
      </p>
    </footer>
  );
}
