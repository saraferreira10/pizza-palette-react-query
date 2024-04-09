import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom"

async function fetchPizza(id) {
    const response = await axios.get(`http://localhost:8080/pizzas/${id}`);
    return response;
}

export default function PizzaDetails() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["get-pizza-by-id"],
        queryFn: () => fetchPizza(id)
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const { name, imgUrl, ingredients, description } = data.data;

    const imgStyle = {
        backgroundImage: `url("${imgUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div className="p-5" style={{ width: "30rem" }} >
            <div className="flex justify-start items-center gap-5">
                <Link to={"/"} className="bg-gray-800 p-2 rounded-full text-xs">👈</Link>
                <h2 className="font-bold">{name}</h2>
            </div>
            <br />
            <div style={imgStyle} className="w-full h-60"></div>
            <br />
            <div className="text-xs text-justify">
                <i className="font-semibold">Ingredientes:</i>
                <br />
                <br />
                <ul className="list-outside">
                    {ingredients.map((ing) => (
                        <li key={ing} className="px-3 flex items-center gap-3"><input type="checkbox" className="cursor-pointer" />{ing}</li>
                    ))}
                </ul>

                <br />

                <p>
                    <i className="font-semibold">Descrição: </i>{description}
                </p>
            </div>
        </div>
    )
}
