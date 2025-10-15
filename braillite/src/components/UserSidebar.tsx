import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  User,
  UserCog,
  KeyRound,
  BookOpen,
  GraduationCap,
  HelpCircle,
  LogOut,
  Menu
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  {
    title: 'Profile',
    url: '/userdash/profile',
    icon: User,
  },
  {
    title: 'Update Profile',
    url: '/userdash/update-profile',
    icon: UserCog,
  },
  {
    title: 'Change Password',
    url: '/userdash/change-password',
    icon: KeyRound,
  },
  {
    title: 'Browse Programs',
    url: '/userdash/browse-programs',
    icon: BookOpen,
  },
  {
    title: 'My Enrollments',
    url: '/userdash/enrollments',
    icon: GraduationCap,
  },
  {
    title: 'Support & Help',
    url: '/userdash/support',
    icon: HelpCircle,
  },
];

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Clear any stored user data/tokens
    localStorage.removeItem('userToken');
    // Redirect to login
    navigate('/login');
  };

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out border-r border-border bg-card`}>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          {!collapsed && (
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">Braillite</h2>
              <p className="text-sm text-muted-foreground">User Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start cursor-pointer ${
                      isActive(item.url)
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-accent hover:text-accent-foreground hover:scale-105'
                    } transition-smooth`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 p-3 rounded-lg">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4 border-t border-border">
          <Button
            variant="outline"
            className={`w-full ${collapsed ? 'px-3' : 'justify-start'} hover:bg-destructive hover:text-destructive-foreground hover:scale-105 transition-smooth cursor-pointer`}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 font-medium">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default UserSidebar;