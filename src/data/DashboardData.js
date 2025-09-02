import { BoxSelect, CreditCard, Users, Wallet } from "lucide-react";

export const cardDetails = [
  {
    id: 1,
    title: "Total Spent",
    value: "$12,345.67",
    icon: <BoxSelect />,
    iconBg: "#E5EE7D",
    iconColor: "#035638",
  },
  {
    id: 2,
    title: "Total Cards",
    value: "15",
    icon: <CreditCard />,
    iconBg: "#FFD6D6",
    iconColor: "#B91C1C",
  },
  {
    id: 3,
    title: "Team Members",
    value: "48",
    icon: <Users />,
    iconBg: "#E0E7FF",
    iconColor: "#1E40AF",
  },
  {
    id: 4,
    title: "Wallet Balance",
    value: "$8,250.00",
    icon: <Wallet />,
    iconBg: "#D1FAE5",
    iconColor: "#065F46",
  },
];
