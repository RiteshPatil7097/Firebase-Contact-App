import React from 'react'
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";

const ContactCard = ({contact}) => {
  return (<div key={contact.id} className='bg-[#FFEAAE] m-6 white border-2 rounded-lg max-w-[360px] flex justify-around'>
                <HiOutlineUserCircle className='w-11 h-11 mt-1 text-[#F6820C]'/>
                <div className=''>
                         <h2 className='font-bold text-xl'>{contact.name}</h2>
                         <p className='text-sm font-semibold text-wrap'>{contact.email}</p>
                </div>
                <div className='flex align-middle mt-2'>
                         <RiEditCircleLine className='w-11 h-9'/>
                         <IoMdTrash className='w-11 h-9 text-[#5F00D9]'/>
                </div>

            </div>)
}

export default ContactCard