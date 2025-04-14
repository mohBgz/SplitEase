
import React from 'react'

function RecentActivity() {
  return (
    
<section className="flex flex-col justify-between content-start">
<div className="recent-activity-title text-[1.7rem] text-[var(--third-text-color)] font-semibold text-shad">Recent Activity</div>
<div className="cards-wrapper py-4 rounded-md flex flex-col gap-3 justify-between">
  <div className="sec-bg flex justify-between p-4 content-center rounded-lg">
    <div className="flex flex-col justify-between content-center">
      <div className="text-[#dadada] text-xl font-medium">Adam</div>
      <div className="text-[var(--secondary-text-color)]">Today</div>
    </div>
    <div className="flex flex-col justify-between content-center">
      <div className="text-[var(--green)]">PLN 8.32</div>
      <div className="text-[var(--secondary-text-color)]">Done</div>
    </div>
  </div>

  <div className="sec-bg flex justify-between p-4 content-center rounded-lg">
    <div className="flex flex-col justify-between content-center">
      <div className="text-[#dadada] text-xl font-medium">Adam</div>
      <div className="text-[var(--secondary-text-color)]">Today</div>
    </div>
    <div className="flex flex-col justify-between content-center">
      <div className="text-[var(--red)]">PLN 8.32</div>
      <div className="text-[var(--secondary-text-color)]">Pending</div>
    </div>
  </div>
</div>
<div className="content-center mb-[30%] mt-2 py-2 text-[#dadada] text-center rounded-xl text-[1.4rem] sec-bg">
  <a className="no-underline" href="#">View All</a>
</div>
</section>    
  )
}

export default RecentActivity

