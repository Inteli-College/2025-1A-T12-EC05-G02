"use client"

import SidebarActions from '../components/home/sidebar-actions';
import StatusCard from '../components/home/subcomponents/status-card';

const handleClick = () => {
    console.log("click");
};

export default function Home() {
  return (
    <div className='flex flex-row justify-between'>
        <div className='flex flex-col items-center justify-center'>
          <SidebarActions />
        </div>
        <StatusCard urgency={0} quantity={21} onClick={handleClick}/>
        <StatusCard urgency={1} quantity={39} onClick={handleClick}/>
        <StatusCard urgency={2} quantity={10} onClick={handleClick}/>
    </div>
    
  );
}