'use client'

import React, { useState, FormEvent } from 'react'

interface ColorSearchFormProp {
  onSearch: (query: string) => void
}

const ColorSearchForm: React.FC<ColorSearchFormProp> = ({ onSearch }: ColorSearchFormProp) => {
  const [query, setQuery] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={query}
          onChange={(e) => { setQuery(e.target.value) }}
          placeholder='Search for matching colors'
          className=''
        />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default ColorSearchForm