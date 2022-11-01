import "preact"
import type { ComponentChildren } from "preact"
import type { ReactNode } from "react"

type Props = {
  children: ComponentChildren
}

const Card = ({ children }: Props) => <div className="card">{children as ReactNode}</div>

export default Card
