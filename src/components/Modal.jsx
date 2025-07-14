import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Modal({ children, onClose, isOpen }) {
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white rounded-md shadow-lg p-8 relative w-5/6 md:w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            autoFocus
          >
            <button
              className="absolute top-4 right-4 rounded-md bg-white hover:bg-gray-200 text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              &#x2715;
            </button>

            <div className="py-4 text-gray-800">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
