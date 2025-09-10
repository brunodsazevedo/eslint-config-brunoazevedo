// Test file to verify ESLint configuration
import React from 'react'

interface Props {
  name: string
  age?: number
}

const TestComponent: React.FC<Props> = ({ name, age }) => {
  const greeting = `Hello, ${name}!`
  
  return (
    <div>
      <h1>{greeting}</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  )
}

export default TestComponent
