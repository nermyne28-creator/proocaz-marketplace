'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Plus, LogOut, LayoutDashboard, MessageSquare, Sun, Moon, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Check for JWT token in localStorage
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Decode JWT to get user info
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            setUser({
              id: payload.userId,
              email: payload.email,
              company: payload.company,
              role: payload.role
            });
          } else {
            // Token expired
            localStorage.removeItem('token');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);

    // Listen for custom auth events
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, [pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  // Don't render user state until mounted (to avoid hydration mismatch)
  const isLoggedIn = mounted && user !== null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border/40"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
            <span className="text-xl font-bold font-display">P</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            ProOccaz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/search"
            className={cn(
              "text-sm font-medium transition-all hover:text-primary relative group",
              pathname === '/search' ? "text-primary" : "text-muted-foreground"
            )}
          >
            Rechercher
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* User indicator */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium max-w-[120px] truncate">
                  {user?.company || user?.email?.split('@')[0]}
                </span>
              </div>

              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center",
                  pathname === '/dashboard' ? "text-primary" : "text-muted-foreground"
                )}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>

              <Link href="/messages" className="relative">
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/create-listing">
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md">
                  <Plus className="mr-2 h-4 w-4" />
                  Déposer une annonce
                </Button>
              </Link>

              <div className="h-6 w-px bg-border/60" />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive transition-colors">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="hover:bg-primary/5 hover:text-primary">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  S'inscrire
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-2"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-5rem)] bg-background/95 backdrop-blur-xl border-t animate-fade-in p-6 flex flex-col gap-6">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/search"
              className="text-lg font-medium p-4 rounded-xl hover:bg-muted transition-colors flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5 mr-3" />
              Rechercher
            </Link>

            {isLoggedIn ? (
              <>
                {/* User badge mobile */}
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user?.company || user?.email}</span>
                </div>

                <Link
                  href="/dashboard"
                  className="text-lg font-medium p-4 rounded-xl hover:bg-muted transition-colors flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <Link href="/create-listing" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary">
                    <Plus className="mr-2 h-5 w-5" />
                    Déposer une annonce
                  </Button>
                </Link>
                <Button variant="destructive" size="lg" onClick={handleLogout} className="w-full justify-start">
                  <LogOut className="mr-3 h-5 w-5" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="lg" className="w-full bg-primary">S'inscrire</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
