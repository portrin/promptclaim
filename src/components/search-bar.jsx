import React from 'react'
import { Input } from 'antd'

const { Search } = Input

export const SearchBar = () => {
  return (
    <Search
      placeholder="Search by product name"
      onSearch={(value) => console.log(value)}
    />
  )
}
