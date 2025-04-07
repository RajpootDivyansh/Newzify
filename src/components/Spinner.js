import React, { Component } from 'react'
import sunloading from './sunloading.gif'
export class Spinner extends Component {
  render() {
    return (
     
        <div className='text-center'><img  className="my-3"src={sunloading} alt="sunloading"/></div>
      
    )
  }
}

export default Spinner