"use client"

import SidebarActions from '../components/home/sidebar-actions';
import StatusCard from '../components/home/subcomponents/status-card';

const handleClick = () => {
    console.log("click");
};

export default function Home() {
  return (
    <div className='flex flex-row gap-x-4 pt-[275px]'>
      <div className='flex flex-col w-[33%] justify-center items-center'>
        <SidebarActions />
      </div>
      <div className='flex flex-col w-[100%]'>
        <div className='flex flex-row gap-x-6 justify-around'>
            <StatusCard urgency={0} quantity={21} onClick={handleClick}/>
            <StatusCard urgency={1} quantity={39} onClick={handleClick}/>
            <StatusCard urgency={2} quantity={10} onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}