/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";

export default function Menu() {
    return (
        <nav className=" bg-gray-800 md:w-72 md:h-full w-full h-16 md:fixed text-center py-10 md:py-10 flex flex-col justify-center items-center md:justify-start">
            <div className="md:h-1/6 h-full">
                <Logo />
            </div>
            <br />
            <div className=" h-0 invisible md:visible flex flex-col gap-3 w-full">
                <NavLink className="bg-gray-900 w-full py-3 text-xs font-bold text-white" to={"/"}>{"Home"}</NavLink>
                <NavLink className="bg-gray-900 w-full py-3 text-xs font-bold text-white" to={"/pizzas/new"}>{"Cadastro de pizzas"}</NavLink>
            </div>
        </nav>
    )
}