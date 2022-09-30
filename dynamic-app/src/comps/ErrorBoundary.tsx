/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material"
import React from "react"

import { CenterLayout } from "@/comps"

type Props = {
  children: React.ReactNode
}

type State = {
  error: any
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary:", error, errorInfo)
  }

  render() {
    return this.state.error ? (
      <CenterLayout sx={{ color: "error.main" }}>
        <Box>
          <Typography component="h1" variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography component="code" variant="h5">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {this.state.error?.message ?? "unknown error"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            window.location.reload()
          }}
        >
          Reload
        </Button>
      </CenterLayout>
    ) : (
      this.props.children
    )
  }
}
