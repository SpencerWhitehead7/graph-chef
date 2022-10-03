import "preact"
import { useState } from "preact/hooks"

import type { RecipeSearchable } from "../../../../shared"
import ListView from "../ListView"
import RecipeDetails from "../RecipeDetails"

type Props = {
  recipe: RecipeSearchable
}

const RecipeRow = ({ recipe }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="recipeRow">
      <RecipeDetails
        title={recipe.title}
        desc={recipe.desc}
        size={recipe.size}
        tags={recipe.tags}
        linkHref={`/${recipe.id}`}
      />
      <button
        type="button"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen)
        }}
      >
        {isOpen ? "Hide recipe" : "Show recipe"}
      </button>
      {isOpen ? <ListView recipe={recipe} /> : null}
    </li>
  )
}

export default RecipeRow
