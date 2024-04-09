/* eslint-disable react/prop-types */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Outlet } from "react-router-dom";
import Menu from "./components/menu/Menu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="h-screen w-full">
        <Menu />
        <div className="w-full h-fit flex justify-center items-center md:w-fit md: flex-wrap md:block md:absolute md:left-96 md:py-10">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider >
  )
}


