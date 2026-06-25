'use client'

import { CheckCircle2 } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'

interface ToastState {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastState | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string) => {
    if (timer.current) clearTimeout(timer.current)
    setMessage(msg)
    timer.current = setTimeout(() => setMessage(null), 2800)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        aria-live="polite"
      >
        {message ? (
          <div
            className="pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-3 text-[14px] shadow-lg"
            style={{
              backgroundColor: 'var(--color-ink)',
              color: '#fff',
              fontWeight: 700,
              animation: 'toast-in 0.25s ease-out',
            }}
            role="status"
          >
            <CheckCircle2 className="h-[18px] w-[18px]" style={{ color: 'var(--color-teal)' }} />
            {message}
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
