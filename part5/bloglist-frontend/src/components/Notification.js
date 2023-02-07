import React from 'react'

const Notification = ({ notice }) => {
  console.log(notice)
  if (notice === null) {
    return null
  }

  if (notice.includes('error is')) {
    return <div className='error'>{notice.replace('error is','')}</div>
  } else {
    return <div className='success'>{notice}</div>
  }
}

export default Notification