export type Position = {
  x: number
  y: number
}

export type RecipeSerialized = {
  id: number
  title: string
  desc: string
  size: string
  tags: string[]
  data: {
    nodes: NodeSerialized[]
    edges: EdgeSerialized[]
    positions: Record<number, Position>
  }
}

export type NodeSerialized = {
  id: number
  action: string
  output: string
}

export type EdgeSerialized = {
  i: number
  o: number
}

export type RecipeListed = {
  ingredients: string[]
  steps: string[]
}

export type RecipeFlowed = {
  nodes: NodeFlowed[]
  edges: EdgeFlowed[]
}

type NodeFlowed = {
  id: string
  data: {
    inputs: string[]
    action: string
    output: string
  }
  position: Position
  type: undefined | "input" | "output"
}

type EdgeFlowed = {
  id: string
  source: string
  target: string
  markerEnd: {
    type: string
    color: string
    strokeWidth: string
  }
}

export type RecipeSearchable = {
  id: number
  title: string
  desc: string
  size: string
  tags: string[]
  ingredients: string[]
  steps: string[]
}

export const serializedToListed = ({ data: { nodes } }: RecipeSerialized): RecipeListed => ({
  ingredients: nodes.filter((n) => !Boolean(n.action)).map((n) => n.output),
  steps: nodes.filter((n) => Boolean(n.action)).map((n) => n.action),
})

export const serializedToFlowed = ({
  data: { nodes, edges, positions },
}: RecipeSerialized): RecipeFlowed => {
  const idsToNodes = nodes.reduce<Record<number, NodeSerialized>>((acc, node) => {
    acc[node.id] = node
    return acc
  }, {})

  const idsToInputIds = edges.reduce<Record<number, number[]>>((acc, edge) => {
    acc[edge.o] ??= []
    acc[edge.o]!.push(edge.i)
    return acc
  }, {})
  const idsToOutputIds = edges.reduce<Record<number, number[]>>((acc, edge) => {
    acc[edge.i] ??= []
    acc[edge.i]!.push(edge.o)
    return acc
  }, {})

  return {
    nodes: nodes
      .filter((n) => Boolean(n.action))
      .map((n) => ({
        id: String(n.id),
        data: {
          inputs: (idsToInputIds[n.id] ?? []).map((id) => idsToNodes[id]!.output),
          action: n.action,
          output: n.output,
        },
        type: !idsToOutputIds[n.id]
          ? "output"
          : (idsToInputIds[n.id] ?? []).every((id) => !Boolean(idsToNodes[id]!.action))
          ? "input"
          : undefined,
        position: positions[n.id]!,
      })),
    edges: edges.map((e) => ({
      id: `${e.i}-${e.o}`,
      source: String(e.i),
      target: String(e.o),
      markerEnd: {
        type: "arrowclosed",
        color: "deepskyblue",
        strokeWidth: "1px",
      },
    })),
  }
}

export const serializedToSearchable = ({
  id,
  title,
  desc,
  size,
  tags,
  data: { nodes },
}: RecipeSerialized): RecipeSearchable => ({
  id,
  title,
  desc,
  size,
  tags,
  ingredients: nodes.filter((n) => !Boolean(n.action)).map((n) => n.output),
  steps: nodes.filter((n) => Boolean(n.action)).map((n) => n.action),
})

export const isStepNode = (node?: Partial<NodeSerialized>): Boolean =>
  Boolean(node && (node.action ?? "") !== "")
export const isIngredientNode = (node?: Partial<NodeSerialized>): Boolean =>
  Boolean(node && (node.action ?? "") === "")

export const addNode = (
  recipe: RecipeSerialized,
  nextId: number,
  nextPosition: Position,
  node?: Omit<NodeSerialized, "id">,
  edges?: Partial<EdgeSerialized>[]
): RecipeSerialized => ({
  ...recipe,
  data: {
    ...recipe.data,
    edges: [...recipe.data.edges, ...(edges ?? []).map((e) => ({ i: nextId, o: nextId, ...e }))],
    nodes: [
      ...recipe.data.nodes,
      node ? { ...node, id: nextId } : { id: nextId, action: "New step", output: "New output" },
    ],
    positions: Object.entries(recipe.data.positions).reduce(
      (pos, [k, v]) => {
        pos[k] = v
        return pos
      },
      { [nextId]: nextPosition } as Record<string, Position>
    ),
  },
})

export const removeNode = (recipe: RecipeSerialized, id: number): RecipeSerialized => {
  const updatedEdges = recipe.data.edges.filter((e) => e.i !== id && e.o !== id)

  return {
    ...recipe,
    data: {
      ...recipe.data,
      nodes: recipe.data.nodes.filter(
        (n) =>
          n.id !== id &&
          (updatedEdges.some((e) => e.i === n.id || e.o === n.id) ||
            // keep from pruning ALL disconnected nodes, instead of just nodes that were orphaned when the target was deleted
            recipe.data.edges.every((e) => e.i !== n.id && e.o !== n.id))
      ),
      edges: updatedEdges,
      positions: Object.entries(recipe.data.positions)
        .filter(([k]) => Number(k) !== id)
        .reduce((pos, [k, v]) => {
          pos[k] = v
          return pos
        }, {} as Record<string, Position>),
    },
  }
}

export const changeNode = (
  recipe: RecipeSerialized,
  node: Partial<NodeSerialized> & Pick<NodeSerialized, "id">
): RecipeSerialized => ({
  ...recipe,
  data: {
    ...recipe.data,
    nodes: recipe.data.nodes.map((n) => (n.id === node.id ? { ...n, ...node } : n)),
  },
})

export const changeNodeStepNum = (
  recipe: RecipeSerialized,
  oldStepNum: number,
  newStepNum: number
): RecipeSerialized => {
  if (oldStepNum === newStepNum || oldStepNum < 1 || newStepNum < 1) return recipe

  const { stepNumsToNodes, maxStepNum } = recipe.data.nodes.reduce(
    (acc, n) => {
      if (isStepNode(n)) {
        acc.stepNumsToNodes[acc.maxStepNum] = n
        acc.maxStepNum++
      }

      return acc
    },
    { stepNumsToNodes: {} as Record<string, NodeSerialized>, maxStepNum: 1 }
  )

  if (oldStepNum > maxStepNum || newStepNum > maxStepNum) return recipe

  const movedNode = stepNumsToNodes[oldStepNum]!
  const movedNodeIngredientInputs = recipe.data.edges
    .filter((e) => e.o === movedNode.id)
    .map((e) => recipe.data.nodes.find((n) => n.id === e.i)!)
    .filter(isIngredientNode)

  const nodeAtReplacement = stepNumsToNodes[oldStepNum < newStepNum ? newStepNum + 1 : newStepNum]!
  const nodeAtReplacementIngredientInputs = recipe.data.edges
    .filter((e) => e.o === nodeAtReplacement.id)
    .map((e) => recipe.data.nodes.find((n) => n.id === e.i)!)
    .filter(isIngredientNode)

  const splicedNodes = [
    ...movedNodeIngredientInputs,
    movedNode,
    ...nodeAtReplacementIngredientInputs,
  ]

  let reorderedNodes = [...recipe.data.nodes]
  reorderedNodes = reorderedNodes.filter((n) => !splicedNodes.includes(n))
  reorderedNodes.splice(
    reorderedNodes.findIndex((n) => n === nodeAtReplacement),
    0,
    ...splicedNodes
  )

  return {
    ...recipe,
    data: {
      ...recipe.data,
      nodes: reorderedNodes,
    },
  }
}

export const changeNodePosition = (
  recipe: RecipeSerialized,
  id: number,
  position: Position
): RecipeSerialized => ({
  ...recipe,
  data: {
    ...recipe.data,
    positions: {
      ...recipe.data.positions,
      [id]: { x: Math.round(position.x), y: Math.round(position.y) },
    },
  },
})

export const addEdge = (recipe: RecipeSerialized, edge: EdgeSerialized): RecipeSerialized => ({
  ...recipe,
  data: {
    ...recipe.data,
    edges: [...recipe.data.edges, edge],
  },
})

export const removeEdge = (recipe: RecipeSerialized, edge: EdgeSerialized): RecipeSerialized => ({
  ...recipe,
  data: {
    ...recipe.data,
    edges: recipe.data.edges.filter((e) => e.i !== edge.i || e.o !== edge.o),
  },
})

export const normalizeRecipe = (recipe: RecipeSerialized): RecipeSerialized => {
  const idsToNodes = recipe.data.nodes.reduce<Record<number, NodeSerialized>>((acc, n) => {
    acc[n.id] = n
    return acc
  }, {})

  const idsToIngredients = recipe.data.edges.reduce<Record<number, NodeSerialized[]>>((acc, e) => {
    acc[e.o] ??= []
    if (isIngredientNode(idsToNodes[e.i])) {
      acc[e.o]!.push(idsToNodes[e.i]!)
    }
    return acc
  }, {})

  const orderedNodes = recipe.data.nodes
    .filter((n) => Boolean(n.action))
    .flatMap((n) => [...(idsToIngredients[n.id] ?? []), n])

  const oldIdsToNewIds = orderedNodes.reduce<Record<number, number>>((acc, n, i) => {
    acc[n.id] = i + 1
    return acc
  }, {})

  return {
    ...recipe,
    data: {
      ...recipe.data,
      nodes: orderedNodes
        // prettier-ignore
        .map((n) => ({ ...n, id: oldIdsToNewIds[n.id]! })),
      edges: recipe.data.edges
        .map((e) => ({
          i: oldIdsToNewIds[e.i]!,
          o: oldIdsToNewIds[e.o]!,
        }))
        .sort((a, b) => (a.o === b.o ? a.i - b.i : a.o - b.o)),
      positions: Object.entries(recipe.data.positions)
        .filter(([id]) => isStepNode(idsToNodes[Number(id)]))
        .reduce<Record<number, Position>>((acc, [id, pos]) => {
          acc[oldIdsToNewIds[Number(id)]!] = pos
          return acc
        }, {}),
    },
  }
}
