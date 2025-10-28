import {
  Home,
  CreditCard,
  Wallet,
  CheckCircle,
  Users,
  Settings,
} from "lucide-react";
import Image from "next/image";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Image src="/category.svg" alt="Cards" width={20} height={20} />,
  },
  {
    name: "Cards",
    path: "/admin/cards-management",
    icon: <Image src="/cards.svg" alt="Cards" width={20} height={20} />,
  },
  {
    name: "Expenses",
    path: "/admin/expenses",
    icon: <Image src="/document-text.svg" alt="Cards" width={20} height={20} />,
  },
  {
    name: "Wallet",
    path: "/admin/wallet",
    icon: <Image src="/wallet-minus.svg" alt="Cards" width={20} height={20} />,
  },
  {
    name: "Approvals",
    path: "/admin/approvals",
    icon: <Image src="/direct-inbox.svg" alt="Cards" width={20} height={20} />,
  },
  {
    name: "Team Members",
    path: "/admin/team-members",
    icon: <Image src="/profile-2user.svg" alt="Cards" width={20} height={20} />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <Image src="/setting-2.svg" alt="Cards" width={20} height={20} />,
  },
];
