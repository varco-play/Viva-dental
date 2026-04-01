'use client'

interface Props {
  label?: string
  variant?: 'primary' | 'outline' | 'gold'
  className?: string
}

export default function PopupButton({ label = 'Записаться', variant = 'primary', className = '' }: Props) {
  const open = () => window.dispatchEvent(new CustomEvent('open-inquiry-popup'))
  const cls = variant === 'gold' ? 'btn-gold' : variant === 'outline' ? 'btn-outline' : 'btn-primary'
  return (
    <button onClick={open} className={`${cls} ${className}`}>
      {label}
    </button>
  )
}
