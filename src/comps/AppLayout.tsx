import React from "react"
import { Outlet } from "react-router-dom"

import { ErrorBoundary, Header } from "@/comps"

export const AppLayout: React.FC = () => (
  <>
    <Header />
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  </>
)
