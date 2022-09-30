import { Box, Modal, ModalProps, Typography } from "@mui/material"
import React from "react"

type Props = {
  title?: string
} & ModalProps

export const ModalLayout: React.FC<Props> = ({ children, title = "", ...modalProps }) => (
  <Modal {...modalProps} aria-labelledby="modal-title">
    <Box
      sx={{
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        p: 2,
      }}
    >
      {title && (
        <Typography id="modal-title" component="h2" variant="h6" align="center">
          {title}
        </Typography>
      )}
      {children}
    </Box>
  </Modal>
)
