import { Link } from "react-router-dom";
import { NavLink } from "./types";

interface DesktopNavProps {
  navLinks: NavLink[];
  onLogoutClick: () => void;
}

export const DesktopNav = ({ navLinks, onLogoutClick }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="text-gray-600 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <Link
        to="/login"
        className="text-gray-600 hover:text-primary transition-colors"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors"
      >
        Register
      </Link>
    </div>
  );
};