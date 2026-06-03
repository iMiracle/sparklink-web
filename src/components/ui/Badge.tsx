import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'ad' | 'vip' | 'game' | 'video' | 'new' | 'recommended' | 'popular';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  ad: 'bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20',
  vip: 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20',
  game: 'bg-[#30D158]/10 text-[#30D158] border-[#30D158]/20',
  video: 'bg-[#AF52DE]/10 text-[#AF52DE] border-[#AF52DE]/20',
  new: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20',
  recommended: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  popular: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
};

export function Badge({ variant = 'vip', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
