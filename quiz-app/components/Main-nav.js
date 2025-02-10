'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import Link from 'next/link';
import ModeToggle from './mode-toggle';

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
      className={cn(
        'flex justify-end items-center lg:space-x-6 m-10 border-b gap-3',
        className
      )}
      {...props}
    >
      <ModeToggle />

      {links.map((link) => {
        const isHomeActive =
          link.href === '/' && (pathname === '/' || pathname === '/quiz-page');
        const isAdminActive =
          link.href === '/admin' && pathname.startsWith('/admin');

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary uppercase',
              isHomeActive || isAdminActive
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
