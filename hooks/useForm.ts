import { ChangeEvent, useState } from 'react'

export default function useForm (initial: any) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial)

  function handleChange (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const { value, name, type } = e.target
    if (type === 'number') {
      parseInt(value)
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value
    })
  }

  function resetForm () {
    setInputs(initial)
  }

  function clearForm () {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    )
    setInputs(blankState)
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  }
}
