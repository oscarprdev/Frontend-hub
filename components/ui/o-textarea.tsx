import { Label } from './label';
import { Textarea } from './textarea';

interface OTextareaProps extends React.ComponentProps<'textarea'> {
  label: string;
  error?: string;
}

export default function OTextarea({ label, error, ...props }: OTextareaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Textarea {...props} />
      {error && (
        <p className="mt-2 text-xs text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
