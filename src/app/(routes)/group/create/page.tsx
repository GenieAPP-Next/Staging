import CreateGroupForm from '@/containers/CreateGroupForm/CreateGroupForm';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';


const CreateGroupPage = () => {
  return (
    <>
      <Navbar pageTitle="Create Group" />
        <CreateGroupForm />
    </>
  );
};

export default CreateGroupPage;
