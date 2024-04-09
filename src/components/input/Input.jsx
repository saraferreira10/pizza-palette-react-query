import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Input({ input = "", name, label = "", type = "text", setInput }) {

    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const style = `text-xs py-1.5 rounded-md px-3 border outline-none sm:w-60 md:w-96 ${isInputEmpty && "border-red-600"}`;

    function handleInputBlur() {
        setIsInputEmpty(input.trim() === "");
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-xs font-bold">{label}</label>
            {type === "textarea" ? (
                < textarea value={input} onBlur={handleInputBlur} className={style} name={name} onChange={e => setInput(e.target.value)} cols="30" rows="10" />
            ) : (
                <input value={input} onBlur={handleInputBlur} className={style} type={type} name={name} onChange={e => setInput(e.target.value)} />
            )}

            {isInputEmpty && <small className="text-red-600 font-semibold" style={{ fontSize: "10px" }}>Este campo é obrigatório!</small>}
        </div>
    )
}
