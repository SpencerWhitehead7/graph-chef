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

export const serializedToListed = ({ data: { nodes } }: RecipeSerialized): RecipeListed => ({
  ingredients: nodes.filter((n) => !Boolean(n.action)).map((n) => n.output),
  steps: nodes.filter((n) => Boolean(n.action)).map((n) => n.action),
})
