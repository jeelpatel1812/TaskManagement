import React from 'react'
import style from './button.css'
export default function Button(props) {
  return (
    <button className='button' onClick={props.onClick}>{props.children}</button>
  )
}
