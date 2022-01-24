import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { CssBaseline } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppLayout, ErrorBoundary } from "@/comps"
import { ROUTES } from "@/logic"
import { Home, NotFound, Recipe, Search, User } from "@/pages"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            <Route path="search" element={<Search />} />

            <Route path="user">
              <Route index element={<Navigate to={ROUTES.USERS} replace={true} />} />
              <Route path=":id" element={<User />} />
            </Route>

            <Route path="recipe">
              <Route index element={<Navigate to={ROUTES.RECIPES} replace={true} />} />
              <Route path=":id" element={<Recipe />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
)
