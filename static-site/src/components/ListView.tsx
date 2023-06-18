import "preact"
import "./ListView.css"

import type { RecipeListed } from "../../../shared"

type Props = {
  recipe: RecipeListed
}

const ListView = ({ recipe }: Props) => (
  <div>
    <h3>Ingredients:</h3>
    <ul className="listView__list">
      {recipe.ingredients.map((ingredient, i) => (
        <li key={i} className="listView__uListItem">
          {ingredient}
        </li>
      ))}
    </ul>
    <h3>Steps:</h3>
    <ol className="listView__list">
      {recipe.steps.map((step, i) => (
        <li key={i}>{step}</li>
      ))}
    </ol>
  </div>
)

export default ListView
