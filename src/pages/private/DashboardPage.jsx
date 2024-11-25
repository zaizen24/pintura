import Navbar from '../../components/private/shared/Navbar';
import PromotionBar from '../../components/private/DashboardPage/PromotionBar';
import RecentlyViewedCourses from '../../components/private/DashboardPage/RecentlyViewedCourses';

import React from 'react'

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <PromotionBar />
      <RecentlyViewedCourses />
    </div>
  )
}

export default DashboardPage
