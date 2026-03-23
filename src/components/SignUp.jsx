import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import axios from "axios";

const SignUp = () => {


  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[password,setPassword]=useState("")


  const[loading,setLoading]=useState("")
  const[success,setSuccess]=useState("")
  const[error,setError]=useState("")


  const submit=async(e)=>{

    e.preventDefault()
    setLoading("Please wait as we upload your data")


    try {

      const data=new FormData()

      data.append("username",username)
      data.append("email",email)
      data.append("phone",phone)
      data.append("password",password)


      const response=await axios.post("https://agnes.alwaysdata.net/api/signup",data)

      setLoading("")

      setSuccess(response.data.message)

      // reset the form  after sending data
      setUsername("")
      setEmail("")
      setPhone("")
      setPassword("")
      
        
    } catch (error) {

      setLoading("")
      setError(error.message)
      
        
    }
  }



  return (
    <div className='row justify-content-center'style={{backgroundColor: 'rgba(182, 212, 211, 1)'}}>
        <div className='col-md-6 card shadow'>

            <h1>Sign up</h1>

            <form action="" onSubmit={submit}>

          <p className='text-warning'>{loading}</p>
          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>

                <input type="text" placeholder='Enter your name' className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <br />
                <input type="email" placeholder='Enter email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <br />
                <input type="tel"placeholder='Enter phone number' className='form-control' value={phone}  onChange={(e)=>setPhone(e.target.value)} />
                <br />
                <input type="password" placeholder='Enter password' className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <br />
                <input type="submit" value='signup' className='btn btn-primary text-white w-100'/>

                <p>Already have an account<Link to='/signin'>Sign in</Link></p>
                



            </form>




        </div>




    </div>
  )
}

export default SignUp