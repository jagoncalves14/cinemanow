import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecipe from "app/recipes/queries/getRecipe"
import deleteRecipe from "app/recipes/mutations/deleteRecipe"

export const Recipe = () => {
  const router = useRouter()
  const recipeId = useParam("recipeId", "number")
  const [deleteRecipeMutation] = useMutation(deleteRecipe)
  const [recipe] = useQuery(getRecipe, { id: recipeId })

  return (
    <>
      <Head>
        <title>Recipe {recipe.id}</title>
      </Head>

      <div>
        <h1>Recipe {recipe.id}</h1>
        <pre>{JSON.stringify(recipe, null, 2)}</pre>

        <Link href={`/recipes/${recipe.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRecipeMutation({ id: recipe.id })
              router.push("/recipes")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowRecipePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Recipe />
      </Suspense>
    </div>
  )
}

ShowRecipePage.authenticate = true
ShowRecipePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRecipePage
