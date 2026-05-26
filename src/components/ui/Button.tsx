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
    primary: 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white hover:opacity-90',
    secondary: 'bg-[#334155] text-[#F8FAFC] hover:bg-[#475569]',
    ghost: 'text-[#94A3B8] hover:text-[#F8FAFC]',
    text: 'text-[#4F46E5] hover:text-[#3730A3] bg-transparent',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626]',
    icon: 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#334155] w-10 h-10 p-0',
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
