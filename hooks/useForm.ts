import { ChangeEvent, useEffect, useState } from 'react'

export default function useForm (initial: any) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial)
  // Setting a different value to prevent an infinite loop
  const initialValues = Object.values(initial).join('')

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial)
  }, [initialValues])

  function handleChange (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const { value, name, type } = e.target

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: type === 'number' ? parseInt(value) : value
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
