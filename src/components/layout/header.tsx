import Link from "next/link";
import Toolbar from "@/components/ui/toolbar";

export default function Header() {
  return (
    <header className="flex justify-center items-center border-b p-4 gap-4">
      <Link className="font-bold" href={"/"}>
        Home
      </Link>
      <Toolbar />
      <Link className="font-bold" href={"/"}>
        Home
      </Link>
    </header>
  );
}
