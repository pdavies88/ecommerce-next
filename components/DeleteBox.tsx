import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { GET_ALL_BOXES } from './Boxes'

const DELETE_BOX = gql`
  mutation Mutation($id: ID!) {
    deleteBox(ID: $id)
  }
`

interface DeleteProps {
  id: string
}

export default function DeleteBox ({ id }: DeleteProps) {
  const [deleteBox, { loading, error }] = useMutation(DELETE_BOX, {
    variables: { id },
    refetchQueries: [{ query: GET_ALL_BOXES }]
  })

  return (
    <>
      {error != null && (
        <div>You have received a Graphql error: {error.message}</div>
      )}

      <button
        type='button'
        disabled={loading}
        onClick={async e => {
          e.preventDefault()
          if (confirm('Are you sure you want to delete this item?')) {
            // Confirm then delete
            await deleteBox()
          }
        }}
      >
        Delete
      </button>
    </>
  )
}
