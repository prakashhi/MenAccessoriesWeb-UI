"use client";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h3 className="text-lg font-semibold">Delete product?</h3>
        <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-3 py-2 bg-red-600 text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
