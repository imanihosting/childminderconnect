import { Link } from "react-router-dom";
import { NavLink } from "./types";

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onLogoutClick: () => void;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, navLinks, onLogoutClick, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-4">
      <div className="flex flex-col space-y-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-gray-600 hover:text-primary transition-colors"
            onClick={onClose}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/login"
          className="text-gray-600 hover:text-primary transition-colors"
          onClick={onClose}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition-colors inline-block text-center"
          onClick={onClose}
        >
          Register
        </Link>
      </div>
    </div>
  );
};