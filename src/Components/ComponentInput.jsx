const ComponentInput = ({type, name, id, value, handleChange}) => {


    return(
        <div className="w-9/12">
            <input type={type} name={name} id={id} value={value ? value : ""} onChange={handleChange} className='mb-4 p-1 w-full text-black rounded-md'/>
        </div>
    )
}

export default ComponentInput