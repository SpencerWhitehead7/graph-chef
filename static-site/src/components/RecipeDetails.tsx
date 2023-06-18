import "preact"

type Props = {
  linkHref?: string
  title: string
  desc: string
  size: string
  tags: string[]
}

const RecipeDetails = ({ linkHref = "", title, desc, size, tags }: Props) => (
  <div>
    <h2>{linkHref === "" ? title : <a href={linkHref}>{title}</a>}</h2>
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
