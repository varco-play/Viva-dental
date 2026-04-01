'use client'
import { ReactNode } from 'react'

interface Props {
  label?: string
  variant?: 'primary' | 'outline' | 'gold'
  className?: string
  children?: ReactNode
}

export default function PopupButton({ label, variant = 'primary', className = '', children }: Props) {
  const open = () => window.dispatchEvent(new CustomEvent('open-inquiry-popup'))
  const cls = variant === 'outline' ? 'btn-outline' : 'btn-primary'
  return (
    <button onClick={open} className={className || cls}>
      {children || label || 'Записаться'}
    </button>
  )
}
