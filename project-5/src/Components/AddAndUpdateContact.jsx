import React from 'react'
import Modal from './Modal'
import {Formik,Form, Field, ErrorMessage} from "formik"
import {addDoc,collection, doc } from 'firebase/firestore'
import {db} from "../config/firebase"
import { toast } from 'react-toastify'
import * as YUP from "yup"

const contactSchemaValidation=YUP.object().shape({
  name:YUP.string().required("Name is Required"),
  email:YUP.string().email("Invalid Email").required("Email is required"),
})

const AddAndUpdateContact = ({isOpen,onClose,contact , isUpdate}) => {

  const addContact=async (contact)=>{
     try{
         const contactRef=collection(db,"contacts")
         await addDoc(contactRef,contact)
         toast.success("Contact Added Successfully")
         onClose()

     }catch(error){
        console.log(error)
        toast.error("Contact not Updated")

     }
  }
    const updateContact=async (contact,id)=>{
     try{
         const contactRef=doc(db,"contacts",id)
         await updateDoc(contactRef,contact)
         toast.success("Contact Updated Successfully")
         onClose()
     }catch(error){
        console.log(error)
        toast.error("Contact not Updated")
     }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
            <Formik 
                    validationSchema={contactSchemaValidation}
                    initialValues={ 
                        isUpdate  
                            ? { 
                                name:contact.name, 
                                email:contact.email,
                              }
                            : {
                              name:"",
                              email:"",
                              }
                    }                 
                    onSubmit={(values)=>{
                      console.log(values)
                      isUpdate? updateContact(values,contact.id) : addContact(values)                   
                    }}
            >
                <Form >
                   <div className='flex flex-col gap-1 m-2'>
                       <label>Name:</label>
                       <Field className=" h-10 w-80 border-2" 
                             name="name" type="text"/>
                       <div className='text-xs text-red-500'>
                          <ErrorMessage name='name' />
                       </div>
                   </div>
                   <div className='flex flex-col gap-1 m-2'>
                       <label>Email:</label>
                       <Field className=" h-10 w-80 border-2" 
                             name="email" type="email" />
                       <div className='text-xs text-red-500'>
                          <ErrorMessage name="email" />
                       </div>
                   </div>

                   <button className='bg-[#FCCA3F] h-9 w-30 mt-3 border-2 rounded-md ml-50'>
                       {isUpdate? "update":"Add"} Contact 
                   </button>
                </Form>
            </Formik>  
      </Modal>  
    </div>
  )
}

export default AddAndUpdateContact