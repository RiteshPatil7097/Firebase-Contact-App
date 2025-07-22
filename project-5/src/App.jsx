import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navbar } from './Components/Navbar'
import './App.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(()=>{
      const getContacts= async () =>{
         try{
            const contactsRef=collection(db,"contacts");
            const contactsSnapshot=await getDocs(contactsRef)
            const contactLists= contactsSnapshot.docs.map((docs) =>
               docs.data())
            console.log(contactLists)
         }
         catch(error){
          console.log(error)
         }
      }
      getContacts();
  },[])

  return (
    <div className='max-w-[370px] mx-auto'>
     <Navbar/>
        <div className='flex'>
            <div className='max-w-[295px] ml-6 gap-2 flex h-19px border-white border-2 rounded-lg'>
            <img className='size-8 mt-2 ml-1' src='./icons/search.svg' alt='image'/>
            <input type='text' placeholder='search contact' 
                    className=' ml-1 bg-transparent h-10 text-white text-xl'/>
          </div>
          
          <img className='ml-2' src='./icons/plus.svg' alt='image'/>
        </div>
    </div>
  )
}

export default App
