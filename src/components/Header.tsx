import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Users,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  Newspaper,
} from "lucide-react";
import logo from "../assets/avt.png";

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Trang chủ", path: "/", icon: Home },
    ...(!isAdmin()
      ? [
          { name: "Thói quen", path: "/habits", icon: Users },
          { name: "Cộng đồng", path: "/community", icon: Users },
          { name: "Địa điểm xanh", path: "/places", icon: MapPin },
          { name: "Tin tức", path: "/news", icon: Newspaper },
        ]
      : []),
    ...(isAdmin() ? [{ name: "Quản lý", path: "/admin", icon: Settings }] : []),
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 gradient-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GL</span>
            </div> */}
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 mx-auto mb-3 mt-2 rounded-full"
            />
            <span className="font-bold text-xl text-green-600">Eco Habit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.fullname} />
                      <AvatarFallback className="bg-green-100 text-green-600">
                        {user.fullname.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.fullname}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.username}
                      </p>
                    </div>
                  </div>
                  {!isAdmin() && (
                    <Link to="/profile">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Thông tin cá nhân</span>
                      </DropdownMenuItem>
                    </Link>
                  )}

                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="gradient-green text-white">Đăng nhập</Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
