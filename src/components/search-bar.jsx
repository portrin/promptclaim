import React from 'react'
import { Input } from 'antd'

const { Search } = Input

export class SearchBar extends React.Component {

  state = {term: ''};

  render(){
      return (
      <Search
        placeholder="Search by product name"
        onSearch={value => console.log(value)}
      />
      );
  }
}
