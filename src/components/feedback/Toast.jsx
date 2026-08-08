import { createContext, useContext, useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import clsx from "clsx";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    const newToast = { id, ...toast };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "flex items-start gap-3 rounded-md p-4 shadow-lg",
              "max-w-sm animate-in slide-in-from-right-full",
              toast.variant === "success"
                ? "bg-green-50 text-green-900"
                : toast.variant === "error"
                ? "bg-red-50 text-red-900"
                : toast.variant === "warning"
                ? "bg-yellow-50 text-yellow-900"
                : "bg-blue-50 text-blue-900"
            )}
          >
            {toast.variant === "success" && (
              <CheckCircle className="mt-0.5 h-5 w-5" />
            )}
            {toast.variant === "error" && (
              <AlertCircle className="mt-0.5 h-5 w-5" />
            )}
            {toast.variant === "warning" && (
              <AlertCircle className="mt-0.5 h-5 w-5" />
            )}
            {toast.variant === "info" && (
              <Info className="mt-0.5 h-5 w-5" />
            )}
            <div className="flex-1">
              <p className="font-medium">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-sm">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="rounded-md p-1 hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default function Toast({ toast }) {
  const { addToast } = useToast();
  useEffect(() => {
    if (toast) addToast(toast);
  }, [toast, addToast]);
  return null;
}
