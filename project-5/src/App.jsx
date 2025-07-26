import { useEffect, useState } from 'react'
import { Navbar } from './Components/Navbar'
import './App.css'
import { collection, getDocs, onSnapshot, snapshotEqual } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './Components/ContactCard'
import { FaPlusCircle } from "react-icons/fa";
import Modal from './Components/Modal';
import AddAndUpdateContact from './Components/AddAndUpdateContact';
import useDisclose from '../Hooks/useDisclose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NotFoundContact} from "./Components/NotFoundContact"

function App() {
  const [contacts, setContacts] = useState([]);
  const {isOpen,onClose,onOpen}=useDisclose();

  useEffect(()=>{
      const getContacts= async () =>{
         try{
            const contactsRef=collection(db,"contacts");
            onSnapshot(contactsRef,(snapshot)=>{

              const contactLists= snapshot.docs.map( (doc) =>
                {
                  return {
                    id:doc.id,
                    ...doc.data(),                  
                  };
               })           
            console.log(contactLists)
            setContacts(contactLists)
            return contactLists;

            })
         }
         catch(error){
          console.log(error)
         }
      }
      getContacts();
  },[])

  const filterContacts=(e)=>{
     const value=e.target.value

     const contactsRef=collection(db,"contacts");
            onSnapshot(contactsRef,(snapshot)=>{

              const contactLists= snapshot.docs.map( (doc) =>
                {
                  return {
                    id:doc.id,
                    ...doc.data(),                  
                  };
               })           

            const filteredContacts=contactLists.filter((contact) =>
               contact.name.toLowerCase().includes(value.toLowerCase())
            )

            setContacts(filteredContacts)
            return filteredContacts;

            })
  }


  return (
    <>
       <div className='max-w-[370px] mx-auto'>
         <Navbar/>
         <div className='flex'>
               <div className='max-w-[295px] ml-6 gap-2 mt-1 flex h-19px border-white border-2 rounded-lg'>
                    <img className='size-8 mt-2 ml-1' src='./icons/search.svg' alt='image'/>
                    <input onChange={filterContacts} 
                            type='text'   
                            placeholder='search contact' 
                            className="ml-1 bg-transparent border-none focus:outline-none focus:ring-0  h-11 w-[290px] text-white text-xl" />             
                </div>
               <FaPlusCircle onClick={onOpen} className='w-11 h-11 cursor-pointer ml-2 flex align-middle mt-2 bg-transparent text-white '/>  
          </div>

         <div>
               {contacts.length == 0 ? <NotFoundContact/> :
                  contacts.map((contact)=>
                        (
                        <ContactCard key={contact.id} contact={contact}/>
                        )
                )}
         </div>
         
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
      <ToastContainer/>
      
    </>
  )
}

export default App
