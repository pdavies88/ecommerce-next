import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { ChangeEvent } from 'react'
import useForm from '../hooks/useForm'
import { useRouter } from 'next/router'
import { GET_ALL_BOXES } from './Boxes'
import { Button, Container } from 'react-bootstrap'

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

export const GET_SINGLE_BOX = gql`
  query Query($id: ID!) {
    box(ID: $id) {
      _id
      cost
      createdAt
      description
      image
      inventory
      name
    }
  }
`

const UPDATE_SINGLE_BOX = gql`
  mutation Mutation($id: ID!, $boxInput: BoxInput) {
    editBox(ID: $id, boxInput: $boxInput)
  }
`
interface Props {
  id: string
}

export default function EditBox ({ id }: Props) {
  const router = useRouter()

  const { data, error, loading } = useQuery(GET_SINGLE_BOX, {
    variables: { id }
  })

  const [editBox, { loading: updateLoading }] = useMutation(UPDATE_SINGLE_BOX)

  const { inputs, handleChange }: FormProps = useForm({
    name: data?.box?.name,
    cost: data?.box?.cost,
    description: data?.box?.description,
    inventory: data?.box?.inventory,
    image: data?.box?.image
  })

  if (loading) return <p>loading...</p>

  return (
    <Container className='d-flex justify-content-center'>
      <form
        onSubmit={async e => {
          e.preventDefault()
          await editBox({
            variables: {
              id,
              boxInput: {
                name: inputs.name,
                description: inputs.description,
                inventory: inputs.inventory,
                cost: inputs.cost,
                image: inputs.image
              }
            },
            refetchQueries: [{ query: GET_ALL_BOXES }]
          })
          const boxId: string = data.box._id
          await router.push({
            pathname: `/box/${boxId}`
          })
        }}
      >
        {error != null && (
          <div>
            You have received a Graphql error:{' '}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </div>
        )}
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
          <Button type='submit'>Update Box</Button>
        </fieldset>
      </form>
    </Container>
  )
}
