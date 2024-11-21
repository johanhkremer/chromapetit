'use client'

import React, { useState, FormEvent } from 'react'
import ColorSearchResponse from './ColorSearchResponse'

const ColorSearchForm = () => {
  const [query, setQuery] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(query)
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
      <ColorSearchResponse query={searchQuery} />
    </div>
  )
}

export default ColorSearchForm