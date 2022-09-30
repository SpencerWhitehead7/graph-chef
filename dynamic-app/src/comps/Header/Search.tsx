import { Search as SearchIcon } from "@mui/icons-material"
import { IconButton, InputBase, alpha, styled } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@/logic"

// copied almost directly from MUI's docs (the header examples)

export const Search: React.FC = () => {
  const navigate = useNavigate()
  const [input, setInput] = React.useState("")

  return (
    <SearchWrapper>
      <StyledInputBase
        placeholder="Search..."
        onChange={(e) => {
          setInput(e.target.value)
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            ;(e.target as HTMLInputElement).blur()
            navigate(ROUTES.SEARCH("recipe", input))
          } else if (e.key === "Escape") {
            ;(e.target as HTMLInputElement).blur()
          }
        }}
        value={input}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        color="inherit"
        onClick={() => {
          navigate(ROUTES.SEARCH("recipe", input))
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </SearchWrapper>
  )
}

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: theme.spacing(0, 2, 0, 0),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: 0,
    margin: theme.spacing(0, 0, 0, 2),
    width: "auto",
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))
