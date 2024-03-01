import CreateGroupForm from '@/components/CreateGroup/CreateGroupForm';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';


const CreateGroupPage = () => {
  return (
    <div>
      <Navbar pageTitle="Create Group" />
      <main>
        <CreateGroupForm />
      </main>
    </div>
  );
};

export default CreateGroupPage;
