import { AccountBox as AccountBoxIcon, Login as LoginIcon } from "@mui/icons-material"
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { StyledFirebaseAuth } from "react-firebaseui"
import { useNavigate } from "react-router-dom"

import { LoadingButton, ModalLayout } from "@/comps"
import { ROUTES, firebaseAuth } from "@/logic"

export const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [user, isLoading, error] = useAuthState(firebaseAuth)
  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <LoadingButton
        isLoading={isLoading}
        error={error}
        variant="outlined"
        color="inherit"
        startIcon={user ? <AccountBoxIcon /> : <LoginIcon />}
        onClick={() => {
          user ? navigate(ROUTES.USER(firebaseAuth.currentUser?.uid ?? "")) : handleOpen()
        }}
      >
        {user ? "Account" : "Log in"}
      </LoadingButton>
      <ModalLayout open={isOpen} onClose={handleClose} title="Log in / Sign up">
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: "popup",
            signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                handleClose()
                return false
              },
            },
          }}
          firebaseAuth={firebaseAuth}
        />
      </ModalLayout>
    </>
  )
}
