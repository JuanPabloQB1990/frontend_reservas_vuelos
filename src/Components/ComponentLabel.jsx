const ComponentLabel = ({htmlFor, text}) => {


    return (
        <div>
            <label htmlFor={htmlFor} className="text-white mb-1">{text}</label>
        </div>
    )
}

export default ComponentLabel;