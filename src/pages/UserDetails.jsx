// src/pages/UserDetailHeader.jsx
import React from 'react';
import { Breadcrumbs, Typography, Button } from '@mui/material';
import { Home, Settings } from '@mui/icons-material';
import Header from '../Components/Header'
import { Card, CardContent, Grid } from '@mui/material';


const UserDetailHeader = () => {
  return (
    <div>
        <Header name="User Details"/>
      <div className="bg-white shadow-md p-4 flex justify-between items-center mt-5 rounded-xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" startIcon={<Home />}>
            Home
          </Button>
          <Typography color="text-primary">User Detail</Typography>
          <Typography color="text-secondary">67568e655b22d1c689e54280</Typography>
        </Breadcrumbs>
        <Button startIcon={<Settings />} color="primary">
        </Button>
      </div>
      <div className="mt-4 rounded-xl h-72 overflow-hidden">
        <img 
          src="https://www.shutterstock.com/image-photo/medical-stethoscope-blue-banner-copy-260nw-588349949.jpg"
          alt="loginbg" 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
      <div className="m-5 relative bottom-20">
        <div className="border rounded-lg shadow-md bg-white">
          <div className="p-6">
            <div className=' space-x-4'>
              <div className="flex items-center justify-around space-x-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Dhruv</h2>
                <p className="text-gray-500 text-sm mb-0.5">xyz@gmail.com</p>
                <p className="text-gray-500 text-sm">+91 1234567890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailHeader;