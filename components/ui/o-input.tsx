import { Input } from './input';
import { Label } from './label';

interface OInputProps extends React.ComponentProps<'input'> {
	label: string;
	error?: string;
}

export default function OInput({ label, error, ...props }: OInputProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={props.id}>{label}</Label>
			<Input {...props} />
			{error && (
				<p className="mt-2 text-xs text-destructive" role="alert" aria-live="polite">
					{error}
				</p>
			)}
		</div>
	);
}
