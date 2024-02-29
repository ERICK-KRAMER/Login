import { useQuery } from "@tanstack/react-query";
import { CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { GetUser } from "../api/api";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


export default function Form():JSX.Element {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { data, isError, error, isLoading } = useQuery({ queryKey: ["user"], queryFn: GetUser });

  const Auth = () => {
    if (isLoading) {
      return <p> Loading... </p> ;
      
    }
  
    if (!data || !data.length) {
      return <p>{error?.message}</p>;
    }

    if(isError) {
      return <p>{error?.message}</p>
    }
  
    const user = data[0]; 
    const verification = user.email === email.current?.value && user.password === password.current?.value;
    if (!verification) {
      alert("Usuário ou senha incorretos");
    } else {
      alert("Usuário autorizado");
    }
  }; 
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Auth();
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  
  return(
    <form onSubmit={ handleSubmit }>
        <div className="inputs flex w-80 rounded h-14 m-2 flex-col relative">
            <label htmlFor="user" className=" pl-2">User</label>
            <input type="text" name="user" className=" h-9 w-full outline-none p-3 pl-7 relative border-b-2 border-slate-600" placeholder="Type or Username" autoComplete="off" ref={ email } required/>
            <CiUser className=" absolute left-1 top-8 text-xl"/>
        </div>
        <div className="inputs flex w-80 rounded h-14 m-2 flex-col relative">
            <label htmlFor="password" className=" pl-2">Password</label>
            <input type={isPasswordVisible ? "text" : "password"} name="password" className=" h-9 w-full outline-none p-3 pl-7 border-b-2 border-slate-600" placeholder="Password" ref={ password } required/>
            <GiPadlock className=" absolute left-1 top-8 text-xl"/>
            {isPasswordVisible ? (
              <FaRegEyeSlash className="absolute right-1 top-8 text-xl" onClick={ handleTogglePasswordVisibility } />
                ) : (
              <FaRegEye className="absolute right-1 top-8 text-xl" onClick={ handleTogglePasswordVisibility } />
            )}
        </div>
        <div className="forgot-password flex items-center justify-end"><small className="cursor-pointer hover:text-blue-500 hover:underline transition mr-3">Forgot password</small></div>
        <div className="btn-container flex justify-center items-center bg-slate-200 rounded-full h-9 m-2"><button className=" login box-shadow w-full h-full rounded-full" type="submit">Login</button></div>
        <div className="flex justify-center items-center">
            <span className="cursor-pointer hover:text-blue-500 hover:underline"><small className="neon-text">Don't have an account?</small></span>
        </div>
    </form>
  )
}