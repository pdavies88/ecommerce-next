import React from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Head from 'next/head'
import { formatCurrency } from '../utils/formatCurrency'

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

interface Props {
  id: string
}

export default function SingleBox ({ id }: Props) {
  const { data, error, loading } = useQuery(GET_SINGLE_BOX, {
    variables: { id }
  })
  if (loading) return <p>Loading...</p>
  if (error != null) return <p>Error: {error.message}</p>

  const { box } = data
  return (
    <div>
      <Head>
        <title>Boosted Boxes | {box.name}</title>
      </Head>
      <img src={box.image} alt={box.name} />
      <div>
        <h2>{box.name}</h2>
        <p>{box.description}</p>
        <p>Cost: {formatCurrency(box.cost)}</p>
        <p>Total Available: {box.inventory}</p>
      </div>
    </div>
  )
}
