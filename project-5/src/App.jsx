import { useEffect, useState } from 'react'
import { Navbar } from './Components/Navbar'
import './App.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCard from './Components/ContactCard'
import { FaPlusCircle } from "react-icons/fa";
import Modal from './Components/Modal';
import AddAndUpdateContact from './Components/AddAndUpdateContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isOpen,setOpen]=useState(false);

  const onOpen= ()=>{
   setOpen(true);
  }
  const onClose= ()=>{
   setOpen(false);
  }

  useEffect(()=>{
      const getContacts= async () =>{
         try{
            const contactsRef=collection(db,"contacts");
            const contactsSnapshot=await getDocs(contactsRef)
            const contactLists= contactsSnapshot.docs.map( (doc) =>
                {
                  return {
                    id:doc.id,
                    ...doc.data(),                  
                  };
               })           
            console.log(contactLists)
            setContacts(contactLists)
         }
         catch(error){
          console.log(error)
         }
      }
      getContacts();
  },[])

  return (
    <>
       <div className='max-w-[370px] mx-auto'>
         <Navbar/>
         <div className='flex'>
               <div className='max-w-[295px] ml-6 gap-2 mt-1 flex h-19px border-white border-2 rounded-lg'>
               <img className='size-8 mt-2 ml-1' src='./icons/search.svg' alt='image'/>
               <input type='text' placeholder='search contact' 
                     className=' ml-1 bg-transparent border-transparent h-10 text-white text-xl'/>
               </div>
               <FaPlusCircle onClick={onOpen} className='w-11 h-11 cursor-pointer ml-2 flex align-middle mt-2 bg-transparent text-white '/>  
          </div>

         <div>
               {contacts.map((contact)=>
                     (
                     <ContactCard key={contact.id} contact={contact}/>
                     )
                  )}
         </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default App
