import Link from 'next/link';
import Toolbar from '@/components/ui/toolbar';

export default function Header() {
	return (
		<header className="flex p-4 justify-center border-b">
			<Link className="text-3xl" href={'/'}>
				Home
			</Link>
			<Toolbar />
			<Link className="text-3xl" href={'/champions'}>
				To the champs
			</Link>
		</header>
	);
}
