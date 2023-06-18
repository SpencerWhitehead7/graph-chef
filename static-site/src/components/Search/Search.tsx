import "preact"
import "./Search.css"

import { useMemo, useState } from "preact/hooks"

import type { RecipeSearchable } from "../../../../shared"
import RecipeRow from "./RecipeRow"

type Props = {
  recipes: RecipeSearchable[]
}

const Search = ({ recipes }: Props) => {
  type SearchTypes = "title" | "tags" | "ingredients"

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => any>(f: T, timeout = 250) => {
    let timer: number

    return (...args: Parameters<T>) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        f(...args)
      }, timeout)
    }
  }

  const normalize = (s: string): string[] =>
    s.trim().replace(/\s+/g, " ").toLowerCase().split(" ").filter(Boolean)

  const [searchFields, setSearchFields] = useState<Record<SearchTypes, string[]>>({
    title: [],
    tags: [],
    ingredients: [],
  })

  const onSearchChange = debounce((k: SearchTypes, v: string): void => {
    setSearchFields((sf) => ({ ...sf, [k]: normalize(v) }))
  }, 500)

  const words = useMemo(
    () =>
      recipes.reduce<Record<SearchTypes, Record<string, Set<RecipeSearchable>>>>(
        (acc, r) => {
          normalize(r.title).forEach((word) => {
            acc.title[word] ??= new Set()
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            acc.title[word]!.add(r)
          })

          r.tags.forEach((tag) => {
            // all tags should be single lowercase words anyway, but just in case
            normalize(tag).forEach((norm) => {
              acc.tags[norm] ??= new Set()
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              acc.tags[norm]!.add(r)
            })
          })

          r.ingredients.forEach((ingredient) => {
            normalize(ingredient).forEach((ingred) => {
              acc.ingredients[ingred] ??= new Set()
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              acc.ingredients[ingred]!.add(r)
            })
          })

          return acc
        },
        {
          title: {},
          tags: {},
          ingredients: {},
        }
      ),
    [recipes]
  )

  const filteredRecipes = Object.values(searchFields).some((searchTerms) => searchTerms.length > 0)
    ? [
        ...Object.entries(searchFields).reduce((includedRecipes, [field, searchWords]) => {
          searchWords.forEach((searchWord) => {
            words[field as SearchTypes]?.[searchWord]?.forEach((foundRecipe) => {
              includedRecipes.add(foundRecipe)
            })
          })

          return includedRecipes
        }, new Set<RecipeSearchable>()),
      ]
    : recipes

  return (
    <div className="search">
      <div className="search__fields">
        <label className="search__fieldLabel">
          Title:
          <input
            onInput={(evt) => {
              onSearchChange("title", evt.currentTarget.value)
            }}
          />
        </label>
        <label className="search__fieldLabel">
          Tags:
          <input
            onInput={(evt) => {
              onSearchChange("tags", evt.currentTarget.value)
            }}
          />
        </label>
        <label className="search__fieldLabel">
          Ingredients:
          <input
            onInput={(evt) => {
              onSearchChange("ingredients", evt.currentTarget.value)
            }}
          />
        </label>
      </div>
      <ul className="search__list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeRow key={recipe.id} recipe={recipe} />)
        ) : (
          <p>No recipes found: try a different search?</p>
        )}
      </ul>
    </div>
  )
}

export default Search
