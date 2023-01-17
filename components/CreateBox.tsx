import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { ChangeEvent } from 'react'
import useForm from '../hooks/useForm'
import { GET_ALL_BOXES } from './Boxes'

interface FormProps {
  clearForm: () => void
  resetForm: () => void
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
  inputs: {
    name: string
    cost: number
    description: string
    inventory: number
    image: string
  }
}

const CREATE_BOX_MUTATION = gql`
  mutation Mutation($boxInput: BoxInput) {
    createBox(boxInput: $boxInput) {
      cost
      description
      image
      inventory
      name
      _id
      createdAt
    }
  }
`

export default function CreateProduct () {
  const { inputs, handleChange, clearForm, resetForm }: FormProps = useForm({
    name: '',
    cost: 0,
    description: '',
    inventory: 0,
    image: ''
  })
  const [createBox, { loading, error, data }] = useMutation(
    CREATE_BOX_MUTATION,
    {
      variables: {
        boxInput: inputs
      },
      refetchQueries: [{ query: GET_ALL_BOXES }]
    }
  )

  console.log(data)

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        // Submit the inputfields to the backend:
        await createBox()
        clearForm()
      }}
    >
      {error != null && <div>You have received a Graphql error</div>}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='cost'>
          Cost
          <input
            type='number'
            id='cost'
            name='cost'
            placeholder='cost'
            value={inputs.cost}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='inventory'>
          Inventory
          <input
            type='number'
            id='inventory'
            name='inventory'
            placeholder='inventory'
            value={inputs.inventory}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='image'>
          Image
          <input
            type='text'
            id='image'
            name='image'
            placeholder='image'
            value={inputs.image}
            onChange={handleChange}
          />
        </label>
        <button type='button' onClick={clearForm}>
          Clear Form
        </button>
        <button type='button' onClick={resetForm}>
          Reset Form
        </button>
        <button type='submit'>+ Add Box</button>
      </fieldset>
    </form>
  )
}
