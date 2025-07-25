import { doc } from 'firebase/firestore';
import React from 'react'
import {createPortal} from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({isOpen,onClose,children}) => {
    if (!isOpen) return null;
  return createPortal(
    <>
    {
        isOpen && 
        <>
            <div className='m-auto relative z-50 min-h-[200px] max-w-[80%] bg-white'>
                <div className='flex justify-end'>
                    <AiOutlineClose onClick={onClose} className='text-2xl self-end'/>
                </div>
                {children}
            </div>
            <div
               onClick={onClose}
               className=' absolute top-0 backdrop-blur-xs z-40 h-screen w-screen'
            />
        </>
    } 
  </>,
  document.getElementById("modal-root")
)}

export default Modal