'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import Link from 'next/link';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Admin',
    href: '/admin',
  },
];

const MainNav = (className, ...props) => {
  const pathname = usePathname(),
    [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    }
  }, []);

  return (
    <nav
      className={cn('flex justify-end lg:space-x-6 m-10 border-b ', className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primnary uppercase',
            pathname === link.href ? '' : 'text-muted-foreground'
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
