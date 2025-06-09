import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Toolbar() {
	return (
		<div className="flex justify-center items-centers gap-6">
			<Select>
				<SelectTrigger>
					<SelectValue placeholder="Select Search" />
				</SelectTrigger>

				<SelectContent>
					<SelectGroup>
						{/* <SelectLabel>Region</SelectLabel> */}

						<SelectItem value="champ">Search Champ</SelectItem>
						<SelectItem value="player">Search Player</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<div className="relative rounded-md">
				<Search className="h-5 w-5 absolute top-2 left-2" />

				<Input type="text" placeholder="Search" className="pl-8" />
			</div>

			<ModeToggle />
		</div>
	);
}
