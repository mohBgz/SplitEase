import React from 'react'
import {Link} from "react-router-dom"

function PageNotFound() {
return (
    <>
            <div className='pt-32 pl-32'>
                    <div className='mb-5 text-4xl text-[var(--third-text-color)]'>Page Not Found :\</div>
                    <div className='pr-bg w-fit p-2 rounded-md shadow-[-1px_0px_17px_0px_#9614e2]'><Link to="/">Return Home</Link></div>
            </div>
    </>
)
}

export default PageNotFound