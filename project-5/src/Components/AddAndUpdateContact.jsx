import React from 'react'
import Modal from './Modal'
import {Formik,Form, Field} from "formik"
import { addDoc,collection } from 'firebase/firestore'
import {db} from "../config/firebase"

const AddAndUpdateContact = ({isOpen,onClose}) => {

  const addContact=async (contact)=>{
     try{
         const contactRef=collection(db,"contacts")
         await addDoc(contactRef,contact)

     }catch(error){
        console.log(error)
     }
  }




  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
            <Formik initialValues={{
                      name: "",
                      email:""
                    }}
                    onSubmit={(values)=>{
                      console.log(values)
                      addContact(values)
                    }}
            >
                <Form >
                   <div className='flex flex-col gap-1 m-2'>
                       <label>Name:</label>
                       <Field className=" h-10 w-80 border-2" 
                             name="name" type="text"/>
                   </div>
                   <div className='flex flex-col gap-1 m-2'>
                       <label>Email:</label>
                       <Field className=" h-10 w-80 border-2" 
                             name="email" type="email" />
                   </div>

                   <button className='bg-[#FCCA3F] h-9 w-30 mt-3 border-2 rounded-md ml-50'>
                       Add Contact 
                   </button>
                </Form>
            </Formik>  
      </Modal>  
    </div>
  )
}

export default AddAndUpdateContact