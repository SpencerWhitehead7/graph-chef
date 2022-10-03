import "preact"

type Props = {
  title: string
  desc: string
  size: string
  tags: string[]
}

const RecipeDetails = ({ title, desc, size, tags }: Props) => (
  <div>
    <h2>{title}</h2>
    <p>
      <strong>Description:</strong> {desc}
    </p>
    <p>
      <strong>Size:</strong> {size}
    </p>
    <p>
      <strong>Tags:</strong> {tags.join(", ")}
    </p>
  </div>
)

export default RecipeDetails
