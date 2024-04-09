import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import FormPizza from "../form/FormPizza";
import { toast, Bounce } from "react-toastify";

async function addPizza(newPizza) {
    const response = await axios.post("http://localhost:8080/pizzas", newPizza);
    return response;
}

export default function NewPizza() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const mutation = useMutation({
        mutationFn: addPizza,
        onSuccess: () => {
            toast.success('Pizza adicionada!', {
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
            reset();
        }
    })

    function reset() {
        setName("");
        setDescription("");
        setIngredients("");
        setImgUrl("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (name.trim() !== "" && description.trim() !== "" && ingredients.trim() !== "" && imgUrl.trim() !== "") {
            mutation.mutate({
                name,
                ingredients: ingredients.split(","),
                description,
                imgUrl
            })

            return;
        }

        toast.error('Preencha todos os campos!', {
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

    return (
        <FormPizza handleSubmit={(e) => handleSubmit(e)}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            ingredients={ingredients}
            setIngredients={setIngredients}
            imgUrl={imgUrl}
            setImgUrl={setImgUrl} />
    )
}
