import "preact"

import type { RecipeSerialized } from "../../../../shared"

type Props = {
  recipe: RecipeSerialized
  onChange: (update: Partial<Omit<RecipeSerialized, "data">>) => void
}

const RecipeDetailsBuilder = ({ recipe, onChange }: Props) => (
  <div className="recipeDetailsBuilder">
    <label className="recipeDetailsBuilder__label">
      <strong>Title:</strong>
      <input
        className="recipeDetailsBuilder__input"
        name="title"
        value={recipe.title}
        onChange={(evt) => {
          onChange({ title: evt.currentTarget.value })
        }}
      />
    </label>
    <label className="recipeDetailsBuilder__label">
      <strong>Description:</strong>
      <input
        className="recipeDetailsBuilder__input"
        name="description"
        value={recipe.desc}
        onChange={(evt) => {
          onChange({ desc: evt.currentTarget.value })
        }}
      />
    </label>
    <label className="recipeDetailsBuilder__label">
      <strong>Size:</strong>
      <input
        className="recipeDetailsBuilder__input"
        name="size"
        value={recipe.size}
        onChange={(evt) => {
          onChange({ size: evt.currentTarget.value })
        }}
      />
    </label>
    <label className="recipeDetailsBuilder__label">
      <strong>Tags:</strong>
      <input
        className="recipeDetailsBuilder__input"
        name="tags"
        value={recipe.tags.join(" ")}
        onChange={(evt) => {
          onChange({
            tags: evt.currentTarget.value
              .split(" ")
              .map((t) => t.toLowerCase().replace(/[^a-z]/g, "")),
          })
        }}
      />
    </label>
  </div>
)

export default RecipeDetailsBuilder
