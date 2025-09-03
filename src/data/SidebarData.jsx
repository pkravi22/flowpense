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
    name: "Cards",
    path: "/admin/cards-management",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: "Expenses",
    path: "/admin/expenses",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: "Wallet",
    path: "/admin/wallet",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    name: "Approvals",
    path: "/admin/approvals",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    name: "Team Members",
    path: "/admin/team-members",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];
