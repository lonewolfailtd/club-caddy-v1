import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Package,
  DollarSign,
  FileText,
  LogOut
} from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Club Caddy Carts',
  description: 'Manage bookings, inventory, and pricing',
  robots: {
    index: false,
    follow: false,
  },
};

async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!(profile as any)?.is_admin) {
    redirect('/');
  }

  const navLinks = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/bookings',
      label: 'Bookings',
      icon: Calendar,
    },
    {
      href: '/admin/inventory',
      label: 'Inventory',
      icon: Package,
    },
    {
      href: '/admin/pricing',
      label: 'Pricing',
      icon: DollarSign,
    },
    {
      href: '/admin/quotes',
      label: 'Quotes',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Admin Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 text-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-zinc-800 px-6">
            <Link href="/admin" className="flex items-center space-x-3">
              <LayoutDashboard className="h-8 w-8 text-rose-500" />
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-xs text-zinc-400">Club Caddy</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-zinc-800 p-4">
            <div className="mb-3 rounded-lg bg-zinc-800 p-3">
              <p className="text-xs text-zinc-400">Logged in as</p>
              <p className="truncate text-sm font-medium">{user.email}</p>
            </div>
            <Link
              href="/auth/signout"
              className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
