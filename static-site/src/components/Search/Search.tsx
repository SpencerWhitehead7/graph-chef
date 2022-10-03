import "preact"

import type { RecipeSearchable } from "../../../../shared"

import RecipeRow from "./RecipeRow"

type Props = {
  recipes: RecipeSearchable[]
}

const Search = ({ recipes }: Props) => (
  <div>
    <ul className="search">
      {recipes.map((recipe) => (
        <RecipeRow key={recipe.id} recipe={recipe} />
      ))}
    </ul>
  </div>
)

export default Search
