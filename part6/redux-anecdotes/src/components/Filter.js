const Filter = () => {
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter