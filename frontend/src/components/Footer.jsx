import React from 'react'

function Footer() {
  return (
    <footer className='absolute left-0 bottom-0 right-0 bg-black text-white'>
        <p className='text-center py-4'>&copy; {new Date().getFullYear()} Bankme. All rights reserved.</p>
    </footer>
  )
}

export default Footer