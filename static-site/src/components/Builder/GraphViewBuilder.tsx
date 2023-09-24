import "preact"
import "reactflow/dist/base.css"
import "./GraphViewBuilder.css"

import type { StateUpdater } from "preact/hooks"
import { useState } from "preact/hooks"
import type { Edge } from "reactflow"
import ReactFlow, { Controls, Handle, Position as HandlePosition } from "reactflow"

import type {
  EdgeSerialized,
  NodeSerialized,
  Position,
  RecipeFlowed,
  RecipeSerialized,
} from "../../../../shared"
import EditNodePanel from "./EditNodePanel"

// TODO: replace add node button with creating new node on connector drag

type Props = {
  recipe: RecipeFlowed
  serializedRecipe: RecipeSerialized
  copyRecipe: VoidFunction
  changeNode: (node: Partial<NodeSerialized> & Pick<NodeSerialized, "id">) => void
  changeNodeStepNum: (oldStepNum: number, newStepNum: number) => void
  changeNodePosition: (id: number, position: Position) => void
  addNode: (node?: Omit<NodeSerialized, "id">, edges?: Partial<EdgeSerialized>[]) => void
  removeNode: (id: number) => void
  addEdge: (edge: EdgeSerialized) => void
  removeEdge: (edge: EdgeSerialized) => void
}

const GraphViewBuilder = ({
  recipe,
  serializedRecipe,
  copyRecipe,
  changeNode,
  changeNodeStepNum,
  addNode,
  removeNode,
  changeNodePosition,
  addEdge,
  removeEdge,
}: Props) => {
  const [selectedNodeId, setSelectedNodeId] = useState(0)

  return (
    <div className="graphViewBuilder">
      <div className="graphViewBuilder__btnContainer">
        <button
          type="button"
          className="graphViewBuilder__btn"
          onClick={() => {
            addNode()
          }}
        >
          Add step
        </button>
        <button type="button" className="graphViewBuilder__btn" onClick={copyRecipe}>
          Copy to clipboard
        </button>
      </div>
      <div className="graphViewBuilder__flowContainer">
        <ReactFlow
          nodes={recipe.nodes.map((n, i) => ({
            ...n,
            data: {
              ...n.data,
              id: n.id,
              stepNum: i + 1,
              setSelectedNodeId,
            },
            type: "builder",
          }))}
          edges={recipe.edges as unknown as Edge[]}
          fitView
          nodesDraggable
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          onClick={() => {
            setSelectedNodeId(0)
          }}
          onNodesChange={(changes) => {
            changes.forEach((c) => {
              if (c.type === "position" && c.dragging) {
                setSelectedNodeId(0)
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                changeNodePosition(Number(c.id), c.position!)
              }
              if (c.type === "remove") {
                removeNode(Number(c.id))
              }
            })
          }}
          onEdgesChange={(changes) => {
            changes.forEach((c) => {
              if (c.type === "remove") {
                const [i, o] = c.id.split("-")
                removeEdge({ i: Number(i), o: Number(o) })
              }
            })
          }}
          onConnect={(connection) => {
            addEdge({
              i: Number(connection.source),
              o: Number(connection.target),
            })
          }}
        >
          <Controls />
        </ReactFlow>
      </div>
      <EditNodePanel
        key={selectedNodeId}
        nodeId={selectedNodeId}
        recipe={serializedRecipe}
        changeNode={changeNode}
        changeNodeStepNum={changeNodeStepNum}
        addNode={addNode}
        removeNode={removeNode}
      />
    </div>
  )
}

type BuilderNodeProps = {
  data: {
    id: string
    inputs: string[]
    action: string
    stepNum: number
    setSelectedNodeId: StateUpdater<number>
  }
}

const BuilderNode = ({
  data: { id, inputs, action, stepNum, setSelectedNodeId },
}: BuilderNodeProps) => (
  <div
    className="builderNode"
    onClick={(evt) => {
      evt.stopPropagation()
      setSelectedNodeId(Number(id))
    }}
  >
    <Handle type="target" position={HandlePosition.Top} />
    <span className="builderNode__stepNum">{stepNum}</span>
    <ul className="builderNode__inputs">
      {inputs.map((input) => (
        <li key={input}>{input}</li>
      ))}
    </ul>
    <span className="builderNode__action">{action}</span>
    <Handle type="source" position={HandlePosition.Bottom} />
  </div>
)

const nodeTypes = { builder: BuilderNode }

export default GraphViewBuilder
