import "preact"

type Props = {
  title: string
  desc: string
  size: string
  tags: string[]
  recipeLinkHref?: string
  editLinkHref?: string
}

const RecipeDetails = ({
  title,
  desc,
  size,
  tags,
  recipeLinkHref = "",
  editLinkHref = "",
}: Props) => (
  <div>
    <h2>
      {recipeLinkHref === "" ? title : <a href={recipeLinkHref}>{title}</a>}
      {editLinkHref === "" ? null : (
        <span>
          &nbsp;<a href={editLinkHref}>Edit</a>
        </span>
      )}
    </h2>
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
