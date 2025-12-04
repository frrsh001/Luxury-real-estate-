"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "info"
  message: string
  duration?: number
}

const toasts: Toast[] = []
let toastCallbacks: ((toast: Toast) => void)[] = []

export function useToast() {
  const [localToasts, setLocalToasts] = useState<Toast[]>([])

  useEffect(() => {
    const callback = (toast: Toast) => {
      setLocalToasts((prev) => [...prev, toast])
      if (toast.duration !== 0) {
        setTimeout(() => {
          setLocalToasts((prev) => prev.filter((t) => t.id !== toast.id))
        }, toast.duration || 3000)
      }
    }
    toastCallbacks.push(callback)
    return () => {
      toastCallbacks = toastCallbacks.filter((cb) => cb !== callback)
    }
  }, [])

  const addToast = (message: string, type: "success" | "error" | "info" = "success", duration = 3000) => {
    const toast: Toast = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      duration,
    }
    toastCallbacks.forEach((cb) => cb(toast))
  }

  return { addToast, toasts: localToasts }
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto ${
            toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {toast.type === "success" && <Check size={20} />}
          {toast.type === "error" && <X size={20} />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
