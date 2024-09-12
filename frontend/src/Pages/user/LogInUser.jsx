import React from 'react'
import './LogInUser.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2';
import { signIn } from '../../services/allApi';
function LogInUser() {

    const [email,setEmail]= useState()
    const[password,setpassword]=useState()

    

    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { email, password };
        console.log(email, password);
        
        try {
            if(!email || !password){
                alert('please fill the feilds')
            }else{
                const response=await signIn(body)
                console.log(response);
                if(response.status==200){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login Successfull.',
                        icon: 'success', 
                        confirmButtonText: 'OK',
                      });
                      setTimeout(()=>{
                        navigate('/');
                      },2000)
                }else if(response.status==406){
                    Swal.fire({
                        title: 'Alert!',
                        text: 'Incorrect Password.',
                        icon: 'alert', 
                        confirmButtonText: 'OK',
                      });
                }else{
                    Swal.fire({
                        title: 'Alert!',
                        text: 'Incorrect username.',
                        icon: 'alert', 
                        confirmButtonText: 'OK',
                      });
                }
                
            }
        } catch (error) {
            alert('Internal server error')
        }
       
      };
      
  return (
    <div>
         <div className='userlogin'>
        <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className='input-box4'>
          <input type="text" onChange={(e)=>setEmail(e.target.value)}  placeholder='email'  required />
        </div>
        <div className='input-box4'>
          <input type="password" onChange={(e)=>setpassword(e.target.value)} placeholder='password'  required />
        
        </div>
        <div className='remember-forgot'>
          <label><input type="checkbox" />Remember Me?</label>
          
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have any account ? <a href="/userReg">Register</a></p>
        </div>


      </form>
      <div>
      </div>

    </div>
    </div>
    </div>
  )
}

export default LogInUser