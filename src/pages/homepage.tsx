import Form from "../components/form";
import { CiLocationArrow1 } from "react-icons/ci";

export default function HomePage():JSX.Element {
  return(
    <div className=" flex items-center justify-center h-screen">
     <div className=" bg-white h-80 p-4 rounded-md pt-6 relative">
        <h1 className="text-center text-4xl font-bold">Login</h1>
        <Form/>
        <CiLocationArrow1 className=" absolute top-3 right-3 text-3xl cursor-pointer"/>
    </div>
    </div>
  )
}