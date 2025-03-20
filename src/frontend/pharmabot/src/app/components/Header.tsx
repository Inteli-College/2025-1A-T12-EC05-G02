"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from "next/link";
import StopButton from "./StopButton";
import CoordinateDisplay from './CoordinateDisplay';
import Active from './Active';
import Sidebar from './Sidebar';

interface Props {
    dashboard?: boolean
}

const Header: React.FC<Props> = ({dashboard=false}) => {
    
    const handleStop = () => {
        alert("O robô irá parar suas atividades");
    };

    return dashboard ? (
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" >     

            <Toolbar className='flex justify-center bg-[#1C191D] py-2 items-center'>

                <div className='w-auto h-auto'>
                    <Sidebar />
                </div>

                <Link href="./"  >
                    <img src="/pharmatech-logo.png" alt="Logo do cinetag" className='h-17'/>
                
                </Link>

                <div className='ml-auto flex flex-row items-center'>

                    <div>
                        
                    <div>
                        <p className='text-[13px] mb-2'>ROBÔ:</p>
                    </div>

                    <div className='mr-5'>
                        <Active active = {true} ></Active>
                    </div>

                    </div>

                    <div className='mr-4'>
                        <CoordinateDisplay className={'mb-1'} label="X" value={10} />
                        <CoordinateDisplay className={"mb-1"} label="Y" value={20} />
                        <CoordinateDisplay className={'mb-0'} label="Z" value={30} />
                    </div>
                    
                    <div className='ml-auto items-center'>
                        <StopButton onClick={handleStop}/>
                    </div>

                </div>

            </Toolbar>

        
        </AppBar>
      </Box>
    ) : (
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" >     

            <Toolbar className='flex justify-center bg-[#1C191D] py-2'>

            <div className='w-auto h-auto absolute left-5' >
                <Sidebar />
            </div>

            <Link href="./"  >
                <img src="/pharmatech-logo.png" alt="Logo do cinetag" className='h-17'/>
            </Link>

            </Toolbar>


        </AppBar>
      </Box>
    )
}

export default Header

//return Dasboard ? (<></>) : (<></>)