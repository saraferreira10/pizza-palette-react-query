/* eslint-disable react/prop-types */

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";

async function deletePizza(id) {
    const response = await axios.delete(`http://localhost:8080/pizzas/${id}`);
    return response
}

export default function PizzaItem({ pizza }) {

    const { id, name } = pizza;

    const { isPending, isError, error, mutate } = useMutation({
        mutationFn: deletePizza,
        onSuccess: () => {
            window.location.reload();
        }
    })

    const imgStyle = {
        backgroundImage: `url('${pizza.imgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    { if (isPending) return "Deletando..." }

    { if (isError) return <div>An error occurred: {error.message}</div> }

    return (
        <div className="w-40">
            <div style={imgStyle} className="bg-blue-100 h-28 w-full"></div>
            <div className="flex justify-between items-center py-2">
                <Link to={`/pizzas/${id}`} className="text-xs text-gray-800 font-extralight">{name}</Link>
                <div className="flex justify-center gap-2">
                    <button className="bg-red-600 hover:bg-red-700 flex text-white items-center justify-center text-base p-1 rounded-full" onClick={() => {
                        if (window.confirm("Deseja excluir esta pizza?")) {
                            mutate(id)
                        }
                    }}><TiDelete /></button>
                    <Link to={`/pizzas/edit/${id}`} className="bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-base p-1 rounded-full">
                        <MdEdit />
                    </Link>
                </div>



            </div>
        </div>
    )
}