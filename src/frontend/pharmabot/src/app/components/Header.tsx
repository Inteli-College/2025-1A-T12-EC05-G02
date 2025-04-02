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
    dashboard?: boolean;
    onStopClick?: () => void; // Função para o clique do botão
    status?: string; // Status do robô
    coordinates?: { x: number; y: number; z: number }; // Coordenadas
    isActive?: boolean; // Estado do robô
}

const Header: React.FC<Props> = ({ dashboard = false, status, onStopClick, coordinates = { x: 0, y: 0, z: 0 }, isActive = false }) => {
    
    const handleStop = () => {
        if (onStopClick) {
            onStopClick();
        } else {
            alert("O robô irá parar suas atividades");
        }
    };

    return dashboard ? (
        <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" >     

            <Toolbar className='flex justify-center bg-[#1C191D] py-2 items-center'>

                <div className='w-auto h-auto'>
                    <Sidebar />
                </div>

                <Link href="./home"  >
                    <img src="/pharmatech-logo.png" alt="Logo do cinetag" className='h-17'/>
                </Link>

                <div className='ml-auto flex flex-row items-center'>

                    <div>
                        <div>
                            <p className='text-[13px] mb-2'>ROBÔ:</p>
                        </div>

                        <div className='mr-5'>
                            <Active active={isActive} />
                        </div>
                    </div>

                    <div className='mr-4'>
                        <CoordinateDisplay className={'mb-1'} label="X" value={coordinates.x} />
                        <CoordinateDisplay className={"mb-1"} label="Y" value={coordinates.y} />
                        <CoordinateDisplay className={'mb-0'} label="Z" value={coordinates.z} />
                    </div>
                    
                    <div className='ml-auto items-center'>
                        <StopButton status={status} onClick={handleStop} />
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

            <Link href="./home"  >
                <img src="/pharmatech-logo.png" alt="Logo do cinetag" className='h-17'/>
            </Link>

            </Toolbar>

        </AppBar>
      </Box>
    )
}

export default Header;