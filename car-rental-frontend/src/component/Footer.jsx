import React from 'react'

const Footer = () => {
    const date=new Date();
  return (
    <div className='Footer'>
        <h2>&copy; {date.getFullYear()} RENTWHEELS. All rights reserved.</h2>
    </div>
  )
}

export default Footer