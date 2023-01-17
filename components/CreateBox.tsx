import { ChangeEvent } from 'react'
import useForm from '../hooks/useForm'

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

export default function CreateProduct () {
  const { inputs, handleChange, clearForm, resetForm }: FormProps = useForm({
    name: '',
    cost: 0,
    description: '',
    inventory: 0,
    image: ''
  })
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        // eslint-disable-next-line no-console
        console.log(inputs)
      }}
    >
      <fieldset>
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
