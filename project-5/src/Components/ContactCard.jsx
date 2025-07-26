import React from 'react'
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import {db} from "../config/firebase";
import { deleteDoc,doc } from 'firebase/firestore';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclose from '../../Hooks/useDisclose';
import { toast } from 'react-toastify';

const ContactCard = ({contact}) => {

  const {isOpen,onClose,onOpen}= useDisclose();

  const deleteContact= async (id)=>{
     try{
        await deleteDoc(doc(db,"contacts",id))
        toast.success("Contact Deleted Successfully")
     }catch(error){
       console.log(error)
     }
  }

  return (
       <>
          <div key={contact.id} className='bg-[#FFEAAE] m-6 white border-2 rounded-lg max-w-[360px] flex justify-around'>
                <HiOutlineUserCircle className='w-11 h-11 mt-1 text-[#F6820C]'/>
                <div className=''>
                          <h2 className='font-bold text-xl'>{contact.name}</h2>
                          <p className='text-sm font-semibold text-wrap'>{contact.email}</p>
                </div>
                <div className='flex align-middle mt-2'>
                          <RiEditCircleLine onClick={onOpen} className='cursor-pointer w-11 h-9'/>
                          <IoMdTrash onClick={()=> deleteContact(contact.id)} 
                                      className='cursor-pointer w-11 h-9 text-[#5F00D9]'/>
                </div>

          </div>
          <AddAndUpdateContact isUpdate 
                               contact={contact}
                               isOpen={isOpen} 
                               onClose={onClose}/>
       </>
  )
}

export default ContactCard