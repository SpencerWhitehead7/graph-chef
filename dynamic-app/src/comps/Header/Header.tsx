import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from "@mui/icons-material"
import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@/logic"

import { Auth } from "./Auth"
import { Search } from "./Search"

export const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            size="large"
            aria-label="go to home"
            onClick={() => {
              navigate(ROUTES.HOME)
            }}
          >
            <CheckBoxOutlineBlankIcon />
            {/* placeholder for graph-chef logo */}
          </IconButton>
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Auth />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
