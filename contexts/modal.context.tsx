'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ModalVariant = 'success' | 'error' | 'warning' | 'info'

type AlertOptions = {
  title?: string
  description: string
  variant?: ModalVariant
}

type ConfirmOptions = AlertOptions & {
  confirmText?: string
  cancelText?: string
}

type ModalContextValue = {
  alert: (options: AlertOptions) => Promise<void>
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

type ModalState = (AlertOptions | ConfirmOptions) & {
  type: 'alert' | 'confirm'
  resolve: (value: boolean) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

const variantConfig = {
  success: {
    icon: CheckCircle2,
    iconClassName: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
  },
  error: {
    icon: XCircle,
    iconClassName: 'bg-rose-500/10 text-rose-600 ring-rose-500/20',
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
  },
  info: {
    icon: Info,
    iconClassName: 'bg-sky-500/10 text-sky-600 ring-sky-500/20',
  },
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null)

  const close = useCallback((value: boolean) => {
    setModal((current) => {
      current?.resolve(value)
      return null
    })
  }, [])

  const alert = useCallback((options: AlertOptions) => {
    return new Promise<void>((resolve) => {
      setModal({
        ...options,
        type: 'alert',
        resolve: () => resolve(),
      })
    })
  }, [])

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setModal({
        ...options,
        type: 'confirm',
        resolve,
      })
    })
  }, [])

  const value = useMemo(() => ({ alert, confirm }), [alert, confirm])
  const variant = modal?.variant ?? 'info'
  const Icon = variantConfig[variant].icon

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Dialog open={Boolean(modal)} onOpenChange={(open) => !open && close(false)}>
        <DialogContent className="overflow-hidden border-white/70 bg-white/90 p-0 shadow-2xl shadow-slate-950/10 backdrop-blur-xl sm:max-w-md">
          {modal && (
            <div className="relative p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />
              <DialogHeader className="items-center text-center">
                <div className={`mb-2 flex size-14 items-center justify-center rounded-2xl ring-1 ${variantConfig[variant].iconClassName}`}>
                  <Icon className="size-7" />
                </div>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {modal.title ?? (modal.type === 'confirm' ? 'Confirmar acción' : 'Aviso')}
                </DialogTitle>
                <DialogDescription className="text-pretty text-sm leading-6">
                  {modal.description}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 border-0 bg-transparent p-0 sm:justify-center">
                {modal.type === 'confirm' && (
                  <Button variant="outline" onClick={() => close(false)}>
                    {(modal as ConfirmOptions).cancelText ?? 'Cancelar'}
                  </Button>
                )}
                <Button
                  variant={variant === 'error' || variant === 'warning' ? 'destructive' : 'default'}
                  onClick={() => close(true)}
                >
                  {modal.type === 'confirm' ? (modal as ConfirmOptions).confirmText ?? 'Confirmar' : 'Aceptar'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}
