'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
}

export function Button({ variant = 'primary', size = 'md', href, className, children, ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90',
    secondary: 'bg-bg-surface text-text-primary hover:bg-bg-surface-hover',
    ghost: 'text-text-secondary hover:text-text-primary',
    text: 'text-primary hover:text-primary-dark bg-transparent',
    danger: 'bg-error text-white hover:bg-red-600',
    icon: 'text-text-secondary hover:text-text-primary hover:bg-bg-surface w-10 h-10 p-0',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm h-8',
    md: 'px-6 py-3 text-base h-12',
    lg: 'px-8 py-4 text-lg h-14',
  };

  const styles = cn(base, variants[variant], variant !== 'icon' && sizes[size], className);

  if (href) {
    return <Link href={href} className={styles}>{children}</Link>;
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
