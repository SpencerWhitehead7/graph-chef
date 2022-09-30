import { Box, SxProps } from "@mui/material"
import React from "react"

type Props = {
  sx?: SxProps
}

export const CenterLayout: React.FC<Props> = ({ children, sx = {} }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      ...sx,
    }}
  >
    {children}
  </Box>
)
