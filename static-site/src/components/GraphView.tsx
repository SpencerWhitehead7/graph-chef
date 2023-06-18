import "preact"
import "reactflow/dist/base.css"
import "./GraphView.css"

import ReactFlow, { Controls, Edge, Node } from "reactflow"

import type { RecipeFlowed } from "../../../shared"

type Props = {
  recipe: RecipeFlowed
}

const GraphView = ({ recipe }: Props) => (
  <ReactFlow
    nodes={
      recipe.nodes.map((n) => ({
        ...n,
        data: { label: <IngredientNode inputs={n.data.inputs} action={n.data.action} /> },
      })) as unknown as Node[]
    }
    edges={recipe.edges as unknown as Edge[]}
    fitView
    attributionPosition="top-right"
  >
    <Controls />
  </ReactFlow>
)

type IngredientNodeProps = {
  inputs: string[]
  action: string
}

const IngredientNode = ({ inputs, action }: IngredientNodeProps) => (
  <div className="ingredientNode">
    <ul className="ingredientNode__inputs">
      {inputs.map((input) => (
        <li key={input}>{input}</li>
      ))}
    </ul>
    <span className="ingredientNode__action">{action}</span>
  </div>
)

export default GraphView
