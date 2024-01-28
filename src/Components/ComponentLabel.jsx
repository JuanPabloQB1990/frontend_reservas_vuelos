const ComponentLabel = ({htmlFor, text}) => {

    return (
        <div>
            <label htmlFor={htmlFor} className="text-white mb-4 font-bold">{text}</label>
        </div>
    )
}

export default ComponentLabel;