import React from "react";

interface CustomModalProps {
  message: string;
  onClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-6 max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Purchase Completed!</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#303cf3] text-white rounded hover:bg-[#2329b6] transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};