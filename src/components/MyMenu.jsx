import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { CiMenuKebab } from "react-icons/ci";
import "./MyMenu.css"
import { useContext } from 'react';
import { MyAuthContext } from '../context/AuthContext';
import { AccessKeyModal } from './AccesKeyModal';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const MyMenu=()=> {
    const [modalOpen, setModalOpen] = useState(false);
    const {hasAccess,clearKey}=useContext(MyAuthContext)
    const navigate=useNavigate()

    const handleLogin=()=>{
         if (hasAccess) {
            navigate("/dashboard");
            } else {
            setModalOpen(true); // kulcsot még nem adott meg → modal nyitás
            }
    }
        const handleLogout=()=>{
        clearKey()
        navigate('/')
    }
  return (
    <div className='myMenu'>
    <Dropdown className="menu">
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
      >
        <CiMenuKebab size={30} className='menu-icon' />
      </MenuButton>
      <Menu>
        {hasAccess ?
            <div>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={()=>navigate("/dashboard")}>Dashboard</MenuItem>   
            </div>
        :
            <MenuItem onClick={handleLogin}>Login</MenuItem>
        }
      </Menu>
    </Dropdown>
     <AccessKeyModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onSuccess={() => navigate("/dashboard")}
            />
    </div>
  );
}
