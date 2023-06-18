import "preact"

import { useState } from "preact/hooks"

import {
  EdgeSerialized,
  isIngredientNode,
  isStepNode,
  NodeSerialized,
  RecipeSerialized,
} from "../../../../shared"

type EditNodePanelProps = {
  key: number
  nodeId: number
  recipe: RecipeSerialized
  changeNode: (node: Partial<NodeSerialized> & Pick<NodeSerialized, "id">) => void
  changeNodeStepNum: (oldStepNum: number, newStepNum: number) => void
  addNode: (node?: Omit<NodeSerialized, "id">, edges?: Partial<EdgeSerialized>[]) => void
  removeNode: (id: number) => void
}

const EditNodePanel = ({
  nodeId,
  recipe,
  changeNode,
  changeNodeStepNum,
  addNode,
  removeNode,
}: EditNodePanelProps) => {
  const [newIngredient, setNewIngredient] = useState("")

  const stepNodes = recipe.data.nodes.filter(isStepNode)
  const originalStepNum = stepNodes.findIndex((n) => n.id === nodeId) + 1
  const [newStepNum, setNewStepNum] = useState(originalStepNum)

  const node = recipe.data.nodes.find((n) => n.id === nodeId)

  if (!node) {
    return <div className="editNodePanel">Click on step to edit</div>
  }

  const nodeInputs = recipe.data.edges
    .filter((e) => e.o === node.id)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((e) => recipe.data.nodes.find((n) => n.id === e.i)!)
  const ingredientInputs = nodeInputs.filter(isIngredientNode)
  const stepInputs = nodeInputs.filter(isStepNode)

  return (
    <div className="editNodePanel">
      <label>
        Step Number:
        <input
          className="editNodePanel__input"
          name="position"
          type="number"
          min={1}
          max={stepNodes.length}
          value={newStepNum === 0 ? "" : newStepNum}
          onChange={(evt) => {
            setNewStepNum(Number(evt.currentTarget.value))
          }}
        />
        <button
          type="button"
          disabled={originalStepNum === newStepNum}
          className="editNodePanel__btn"
          onClick={() => {
            changeNodeStepNum(originalStepNum, newStepNum)
          }}
        >
          Change
        </button>
      </label>
      <label className="editNodePanel__label">
        Instructions:
        <textarea
          className="editNodePanel__input"
          name="instructions"
          // prevents my other preventative measure from creating a weird leading blank space when input should be empty
          value={node.action.trimStart()}
          onChange={(evt) => {
            changeNode({
              id: node.id,
              // prevents node from vanishing because the algo thinks it's an ingredient if field is emptied
              action: evt.currentTarget.value.trimStart() || " ",
            })
          }}
        />
      </label>
      <label className="editNodePanel__label">
        Output:
        <input
          className="editNodePanel__input"
          name="output"
          value={node.output}
          onChange={(evt) => {
            changeNode({
              id: Number(node.id),
              output: evt.currentTarget.value.trimStart(),
            })
          }}
        />
      </label>
      <div>
        Ingredients:
        <ul className="editNodePanel__list">
          {ingredientInputs.map((n) => (
            <li key={n.id}>
              {n.output}
              <button
                type="button"
                className="editNodePanel__removeBtn"
                onClick={() => {
                  removeNode(n.id)
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <label>
          New ingredient:
          <input
            className="editNodePanel__input"
            name="add ingredient"
            value={newIngredient}
            onChange={(evt) => {
              setNewIngredient(evt.currentTarget.value)
            }}
            onKeyUp={(evt) => {
              if (evt.key === "Enter") {
                addNode(
                  {
                    action: "",
                    output: newIngredient,
                  },
                  [{ o: Number(node.id) }]
                )
                setNewIngredient("")
              }
            }}
          />
        </label>
      </div>
      <div>
        Inputs from previous step(s):
        <ul className="editNodePanel__list">
          {stepInputs.map((n) => (
            <li key={n.id}>{n.output}</li>
          ))}
        </ul>
        Add / remove inputs from steps by connecting them
      </div>
    </div>
  )
}

export default EditNodePanel
