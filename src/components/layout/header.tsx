import Link from 'next/link';
import Toolbar from '@/components/ui/toolbar';

export default function Header() {
	return (
		<header className="flex p-4 justify-center border-b items-center gap-4">
			<Link className="font-bold" href={'/'}>
				Home
			</Link>
			<Toolbar />
			<Link className="font-bold" href={'/'}>
				Home
			</Link>
		</header>
	);
}
