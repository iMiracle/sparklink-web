import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './locales';

export const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales, localePrefix: 'always' });
