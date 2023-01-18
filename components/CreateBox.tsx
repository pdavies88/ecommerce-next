import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { ChangeEvent } from 'react'
import { Button, Container } from 'react-bootstrap'
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
  const router = useRouter()

  const { inputs, handleChange, clearForm, resetForm }: FormProps = useForm({
    name: '',
    cost: 0,
    description: '',
    inventory: 0,
    image: ''
  })
  const [createBox, { loading, error }] = useMutation(CREATE_BOX_MUTATION, {
    variables: {
      boxInput: inputs
    },
    refetchQueries: [{ query: GET_ALL_BOXES }]
  })

  return (
    <Container className='d-flex justify-content-center'>
      <form
        onSubmit={async e => {
          e.preventDefault()
          // Submit the inputfields to the backend:
          await createBox()
          clearForm()
          await router.push('/')
        }}
      >
        {error != null && (
          <div>You have received a Graphql error: {error.message}</div>
        )}
        <fieldset disabled={loading} aria-busy={loading}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
              <input
                className='form-control'
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='mb-3'>
            <label htmlFor='cost' className='form-label'>
              Cost
              <input
                className='form-control'
                type='number'
                id='cost'
                name='cost'
                placeholder='cost'
                value={inputs.cost}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='mb-3'>
            <label htmlFor='inventory' className='form-label'>
              Inventory
              <input
                className='form-control'
                type='number'
                id='inventory'
                name='inventory'
                placeholder='inventory'
                value={inputs.inventory}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
              <textarea
                className='form-control'
                id='description'
                name='description'
                placeholder='Description'
                value={inputs.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='mb-3'>
            <label htmlFor='image' className='form-label'>
              Image
              <input
                className='form-control'
                type='text'
                id='image'
                name='image'
                placeholder='image'
                value={inputs.image}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='mb-3'>
            <Button type='button' onClick={clearForm} className='btn-warning'>
              Clear Form
            </Button>
          </div>
          <div className='mb-3'>
            <Button type='button' onClick={resetForm} className='btn-warning'>
              Reset Form
            </Button>
          </div>
          <div className='mb-3'>
            <Button type='submit'>Add New Box</Button>
          </div>
        </fieldset>
      </form>
    </Container>
  )
}
