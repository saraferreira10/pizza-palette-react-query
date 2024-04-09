import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FormPizza from "../form/FormPizza";
import { useMutation } from "@tanstack/react-query";
import { toast, Bounce } from "react-toastify";

async function fetchPizza(id) {
    const response = await axios.get(`http://localhost:8080/pizzas/${id}`);
    return response;
}

async function putPizza(pizza) {
    const response = await axios.put("http://localhost:8080/pizzas", pizza);
    return response;
}

export default function EditPizza() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [`get-pizza-by-id-${id}`],
        queryFn: () => fetchPizza(id)
    })

    const mutation = useMutation({
        mutationFn: putPizza,
        onSuccess: () => {
            toast.success('Pizza editada!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
                theme: "light",
                transition: Bounce,
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    })

    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newIngredients, setNewIngredients] = useState("");
    const [newImgUrl, setNewImgUrl] = useState("");

    useEffect(() => {
        setNewName(data?.data.name);
        setNewDescription(data?.data.description);
        setNewIngredients(data?.data.ingredients.toString());
        setNewImgUrl(data?.data.imgUrl);
    }, [data])

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    function handleSubmit(e) {
        e.preventDefault();

        mutation.mutate({
            id,
            name: newName,
            description: newDescription,
            ingredients: newIngredients.split(","),
            imgUrl: newImgUrl
        })
    }

    return (
        <FormPizza
            handleSubmit={(e) => handleSubmit(e)}
            name={newName}
            description={newDescription}
            ingredients={newIngredients}
            imgUrl={newImgUrl}
            setName={setNewName}
            setDescription={setNewDescription}
            setIngredients={setNewIngredients}
            setImgUrl={setNewImgUrl} />
    )
}
