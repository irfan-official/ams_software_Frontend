import React,{useState, useEffect, useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import isValidEmail from "./library/validEmailChecker.js"
import axios from "./library/axiosInstance.js"
import { UserContext } from "./context/Context.jsx";

function LoginTeacher() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {setErrorMessage} = useContext(UserContext);

  const navigate = useNavigate()

  async function handleSubmit(e){
   try{
     e.preventDefault();

    let obj = {
      email: email.trim(),
      password: password.trim()
    }

    if (!obj.email || !obj.password) {
      alert("Email and Password are required")
      return;
    }
    if (!isValidEmail(obj.email)) {
      alert("Enter a valid Email Address")
      return;
    }

    console.log(obj)

    let response = await axios.post("/auth/api/v1/supervisor/login", {
      email, password
    })

    alert(response.data.message)

    if(response.data.redirect){
      navigate("/login/teacher") // if login fails
    }
    navigate("/") // if login pass
   }catch(error){

    setErrorMessage(error.message)
    navigate("/error")
   }
  }

  return (
    
<div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
  <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
  <div className="w-full">
    <div className="text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
      <p className="mt-2 text-gray-500">Login below to access your account</p>
    </div>
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <div className="relative mt-6">
          <input
          onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            value={email}
            required
            placeholder="Email Address"
            className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
            autoComplete="off"
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Email Address
          </label>
        </div>
        <div className="relative mt-6">
          <input
           onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            required
            value={password}
            placeholder="Password"
            className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Password
          </label>
        </div>
        <div className="my-6">
          <button
            type="submit"
            className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
          >
            Login
          </button>
        </div>
        <p className="text-center text-sm text-gray-500">
          Don't have an account yet?
          <NavLink
            to="/register/teacher"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            {" "}
            Register
          </NavLink>
          .
        </p>
      </form>
    </div>
  </div>
</div>
</div>

  )
}

export default LoginTeacher

