interface arguments{
    type: "text"|"password",
    placeholder: string,
    label : string,
} 

export default function Input({type,placeholder,label,onChange}:arguments){
    return (
        <div className="flex flex-col gap-1 w-full text-black">
            <p className="font-bold">
                {label}
            </p>
            <input onChange={onChange} className="px-3 py-1 border rounded-sm outline-none text-black w-full" type={type} placeholder={placeholder} />
        </div>
    )
}
