import DashboardData from '@/components/DashboardData/DashboardData';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';


const DashboardPage = () => {
  return (
    <div>
      <Navbar pageTitle="Genie" />
      <main>
        <DashboardData />
      </main>
    </div>
  );
};

export default DashboardPage;
