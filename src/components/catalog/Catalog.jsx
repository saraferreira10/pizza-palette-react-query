import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PizzaItem from "../pizza_item/PizzaItem";

async function fetchData() {
  const response = await axios.get("http://localhost:8080/pizzas");
  return response;
}

export default function Catalog() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-pizzas"],
    queryFn: fetchData
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="text-center md:text-justify w-full" >
      <h2 className="text-xl font-bold">Cardápio Online</h2>
      <br />
      <ul className="flex gap-4 flex-wrap justify-center md:justify-start">
        {data?.data.map((pizza) => (
          <PizzaItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  )
}