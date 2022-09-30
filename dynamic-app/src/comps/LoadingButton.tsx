import { Error as ErrorIcon } from "@mui/icons-material"
import { Button, ButtonProps, CircularProgress } from "@mui/material"
import React from "react"

type Props = ButtonProps & {
  isLoading: boolean
  loadingCopy?: string
  error?: Error
  errorCopy?: string
}

export const LoadingButton: React.FC<Props> = ({
  isLoading,
  loadingCopy = "Loading",
  error,
  errorCopy = "Error",
  children,
  ...buttonProps
}) => (
  <Button
    variant="outlined"
    color="inherit"
    size="medium"
    {...buttonProps}
    startIcon={
      isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : error ? (
        <ErrorIcon />
      ) : (
        buttonProps.startIcon
      )
    }
  >
    {isLoading ? loadingCopy : error ? errorCopy : children}
  </Button>
)
