"use client";
import { X } from "lucide-react";
import React from "react";

const WalletModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        {title && (
          <div className="mb-4">
            <h2 className="text-[24px] text-[#035638]">{title}</h2>
          </div>
        )}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default WalletModal;
