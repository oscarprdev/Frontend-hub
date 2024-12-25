import { Input } from './input';
import { cn } from '~/lib/utils/cn';

export default function OInput({
	id,
	text,
	className,
}: {
	id: string;
	text: string;
	className?: string;
}) {
	return (
		<div className={cn('group relative', className)}>
			<label
				htmlFor={id}
				className="absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted transition-all duration-300 group-focus-within:pointer-events-none group-focus-within:top-1/4 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-muted has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-1/4 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
				<span className="inline-flex bg-background px-2">{text}</span>
			</label>
			<Input id={id} name={id} type="text" placeholder="" className="pb-4 pt-8" />
		</div>
	);
}
