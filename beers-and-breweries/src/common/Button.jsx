const Button = ({ id, onClick, label, className, type }) => {
    return (
        <button type={type} id={id} onClick={onClick} className={className}>{label}</button>
    )
}

export default Button;