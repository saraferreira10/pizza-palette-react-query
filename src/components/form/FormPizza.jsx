/* eslint-disable react/prop-types */
import Input from "../input/Input";

export default function FormPizza({
    handleSubmit,
    name,
    setName,
    description,
    setDescription,
    ingredients,
    setIngredients,
    imgUrl,
    setImgUrl
}) {

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input name={"name"} input={name} label={"Nome da pizza:"} setInput={setName} />

            <Input name={"description"} input={description} label={"Descrição"} type="textarea" setInput={setDescription} />

            <Input name={"ingredients"} input={ingredients} label={"Ingredientes"} type="textarea" setInput={setIngredients} />

            <Input name={"imgUrl"} input={imgUrl} label={"Url da imagem:"} setInput={setImgUrl} />

            <input className="text-xs bg-gray-800 text-white py-2 cursor-pointer rounded hover:bg-gray-900 duration-700" type="submit" value="Enviar" />
        </form>

    )
}
