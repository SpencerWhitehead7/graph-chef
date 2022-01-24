import { Container, Typography } from "@mui/material"
import React from "react"

type Props = {
  title: string
}

export const PageLayout: React.FC<Props> = ({ title, children }) => (
  <Container maxWidth="xl" component="main">
    <Typography component="h1" variant="h4" gutterBottom>
      {title}
    </Typography>
    {children}
  </Container>
)
