'use client'

import React, { useState, FormEvent } from 'react'
import ColorSearchResponse from './PaintSearchResponse'
import { Button } from '@/components/ui/button'

const PaintSearchForm = () => {
  const [query, setQuery] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(query)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          type='text'
          value={query}
          onChange={(e) => { setQuery(e.target.value) }}
          placeholder='Paint name'
          className='w-auto'
        />
        <Button type='submit' className='mt-3'>Search</Button>
      </form>
      <ColorSearchResponse query={searchQuery} />
    </div>
  )
}

export default PaintSearchForm