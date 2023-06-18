import "preact"

import { useState } from "preact/hooks"

import {
  addEdge,
  addNode,
  changeNode,
  changeNodePosition,
  changeNodeStepNum,
  EdgeSerialized,
  isStepNode,
  NodeSerialized,
  normalizeRecipe,
  Position,
  RecipeSerialized,
  removeEdge,
  removeNode,
  serializedToFlowed,
  serializedToListed,
} from "../../../../shared"
import ListView from "../ListView"
import Card from "./Card"
import GraphViewBuilder from "./GraphViewBuilder"
import RecipeDetailsBuilder from "./RecipeDetailsBuilder"

type Props = {
  recipe?: RecipeSerialized
}

const emptyRecipe: RecipeSerialized = {
  id: 0,
  title: "New Recipe",
  desc: "fill in",
  size: "these details",
  tags: ["and", "tags"],
  data: {
    nodes: [{ id: 1, action: "New step", output: "New output" }],
    edges: [],
    positions: { 1: { x: 0, y: 0 } },
  },
}

const Builder = ({ recipe: initialRecipe = emptyRecipe }: Props) => {
  const [recipe, setRecipe] = useState<RecipeSerialized>(initialRecipe)
  const [nextId, setNextId] = useState<number>(
    Math.max(...recipe.data.nodes.map(({ id }) => id)) + 1
  )
  const [nextPosition, setNextPosition] = useState(
    recipe === emptyRecipe ? { x: 20, y: 20 } : { x: 0, y: 0 }
  )

  const onChangeMeta = (val: Partial<Omit<RecipeSerialized, "data">>) => {
    setRecipe((recipe) => ({ ...recipe, ...val }))
  }

  const onAddNode = (node?: Omit<NodeSerialized, "id">, edges?: Partial<EdgeSerialized>[]) => {
    setRecipe((recipe) => addNode(recipe, nextId, nextPosition, node, edges))
    setNextId((id) => id + 1)
    if (isStepNode(node)) {
      setNextPosition(({ x, y }) => ({ x: x + 40, y: y + 40 }))
    }
  }

  const onRemoveNode = (id: number) => {
    setRecipe((recipe) => removeNode(recipe, id))
  }

  const onChangeNode = (node: Partial<NodeSerialized> & Pick<NodeSerialized, "id">) => {
    setRecipe((recipe) => changeNode(recipe, node))
  }

  const onChangeNodeStepNum = (oldStepNum: number, newStepNum: number) => {
    setRecipe((recipe) => changeNodeStepNum(recipe, oldStepNum, newStepNum))
  }

  const onChangeNodePosition = (id: number, position: Position) => {
    setRecipe((recipe) => changeNodePosition(recipe, id, position))
  }

  const onAddEdge = (edge: EdgeSerialized) => {
    setRecipe((recipe) => addEdge(recipe, edge))
  }

  const onRemoveEdge = (edge: EdgeSerialized) => {
    setRecipe((recipe) => removeEdge(recipe, edge))
  }

  const copyRecipe = () => {
    const normalizedRecipe = normalizeRecipe(recipe)
    console.log(normalizedRecipe)
    navigator.clipboard.writeText(JSON.stringify(normalizeRecipe(recipe))).catch((err) => {
      console.log(err)
    })
  }

  return (
    <main>
      <div className="grid-container">
        <Card>
          <RecipeDetailsBuilder recipe={recipe} onChange={onChangeMeta} />
          <ListView recipe={serializedToListed(recipe)} />
        </Card>
        <Card>
          <GraphViewBuilder
            recipe={serializedToFlowed(recipe)}
            serializedRecipe={recipe}
            copyRecipe={copyRecipe}
            changeNode={onChangeNode}
            changeNodeStepNum={onChangeNodeStepNum}
            addNode={onAddNode}
            removeNode={onRemoveNode}
            changeNodePosition={onChangeNodePosition}
            addEdge={onAddEdge}
            removeEdge={onRemoveEdge}
          />
        </Card>
      </div>
    </main>
  )
}

export default Builder
