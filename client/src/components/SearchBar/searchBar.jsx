import React from 'react'
// import { connect } from 'react-redux'
import './searchBar.css'

export const searchBar = (props) => {
  return (
    <div className='searchBar'>
        <div className='titles'>Search:</div>
        <input placeholder='Search...'></input>
        <div className='titles'>Sort By:</div>
        
    </div>
  )
}

export default searchBar