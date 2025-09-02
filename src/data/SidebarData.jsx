import {
  Home,
  CreditCard,
  Wallet,
  CheckCircle,
  Users,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: <CreditCard className="w-5 h-5" />,
  },
  { name: "Wallet", path: "/wallet", icon: <Wallet className="w-5 h-5" /> },
  {
    name: "Approvals",
    path: "/approvals",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  { name: "Team Members", path: "/team", icon: <Users className="w-5 h-5" /> },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];
