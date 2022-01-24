type SearchType = "recipe" | "user"

const search = (type: SearchType, input = "") => `/search?type=${type}&query=${input}`

export const ROUTES = {
  HOME: "/",
  SEARCH: search,
  USERS: search("user"),
  USER: (id: string) => `/user/${id}`,
  RECIPES: search("recipe"),
  RECIPE: (id: string) => `/recipe/${id}`,
}
