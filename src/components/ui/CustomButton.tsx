import React from 'react'
import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'

interface CustomButtonProps extends ButtonProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  startIcon,
  endIcon,
  className = '',
  ...props
}) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
