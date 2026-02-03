import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/classnames.util';

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader = ({ className, size = 24 }: LoaderProps) => {
  return (
    <Loader2 
      className={cn("animate-spin text-primary", className)} 
      size={size}
    />
  );
};
