import React, { useState } from 'react'
import './RegUser.css'
import { signUp } from '../../services/allApi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


function RegUser() {

    const [username,setUsername]=useState()
    const [email,setEmail]=useState()
    const [password,setpassword]=useState()

    const navigate=useNavigate()

    //sign up

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { username, email, password };
        console.log(username, password, email);
        try {
          const response = await signUp(body);
          console.log(response.status);
      
          if (response.status === 200) {
            Swal.fire({
                title: 'Success!',
                text: 'Registeration Successfull.',
                icon: 'success', 
                confirmButtonText: 'OK',
              });
    
            setTimeout(() => {
              navigate('/userLogin');
            }, 2000);
          } else if (response.status === 406) {
            // toast.error("Account already exists");
            Swal.fire({
                title: 'Faild!',
                text: 'Account already exist.',
                icon: 'Info', 
                confirmButtonText: 'OK',
              });
    
          } else {
           alert('Internal server error')
          }
        } catch (error) {
         alert('Faild to register')
          console.error("Error:", error);
        }
      }
  return (
    <div>
             <div className='userRegisteration'>
        <div className='wrapperReg'>

          <form onSubmit={handleSubmit}>

            <h1>Sign Up</h1>

            <div className='input-box5'>
              <input type="text" name='username' onChange={(e) => setUsername(e.target.value)}  placeholder='Username' required />
             
            </div>
            <div className='input-box5'>
              <input type="email" onChange={(e) => setEmail(e.target.value)}  placeholder='email' name='email' required />
             
            </div>
            <div className='input-box5'>
              <input type="password" onChange={(e) => setpassword(e.target.value)} placeholder='password' name='psw' required />

            </div>
            <button type='submit' >Register</button>


          </form>

        </div>
      </div>
    </div>
  )
}

export default RegUser