"use client";
import { useState } from "react";

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState("Professional");

  const plans = [
    {
      name: "Starter",
      price: 19,
      features: [
        "Up to 10 cards",
        "Basic expense tracking",
        "Email support",
        "Monthly reports",
      ],
    },
    {
      name: "Professional",
      price: 49,
      features: [
        "Up to 50 cards",
        "Advanced analytics",
        "Priority support",
        "Real-time reporting",
      ],
    },
    {
      name: "Enterprise",
      price: 99,
      features: [
        "Unlimited cards",
        "Custom integrations",
        "Dedicated support",
        "Advanced compliance",
      ],
    },
  ];

  const handleChangePlan = (planName) => {
    setCurrentPlan(planName);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const isCurrent = plan.name === currentPlan;
        const isUpgrade =
          plans.findIndex((p) => p.name === plan.name) >
          plans.findIndex((p) => p.name === currentPlan);

        return (
          <div
            key={plan.name}
            className={`border rounded-xl p-6 shadow-md ${
              isCurrent ? "bg-blue-50 border-blue-400" : "bg-white"
            }`}
          >
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold mt-2">
              ${plan.price}
              <span className="text-sm font-normal">/mo</span>
            </p>

            <ul className="mt-4 space-y-2 text-md text-gray-600">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <div className="mt-6">
              {isCurrent ? (
                <button
                  disabled
                  className="w-full py-2 rounded-4xl bg-gray-200 text-gray-600 font-semibold cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleChangePlan(plan.name)}
                  className={`w-full py-2 rounded-4xl font-semibold ${
                    isUpgrade
                      ? "bg-black text-white hover:bg-blue-700"
                      : " text-green-400  bg-white border border-green-400"
                  }`}
                >
                  {isUpgrade ? "Upgrade" : "Downgrade"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
