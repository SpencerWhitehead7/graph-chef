type Position = { x: number; y: number }

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

type NodeSerialized = {
  id: number
  action: string
  output: string
}

type EdgeSerialized = {
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
          inputs: idsToInputIds[n.id]!.map((id) => idsToNodes[id]!.output),
          action: n.action,
          output: n.output,
        },
        type: !idsToOutputIds[n.id]
          ? "output"
          : idsToInputIds[n.id]!.every((id) => !Boolean(idsToNodes[id]!.action))
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
