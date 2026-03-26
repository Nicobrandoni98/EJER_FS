const Filter = ({filter, handleFilterChan}) => {

    return (
        <div>
        Filter shown with
        <input value={filter} onChange={handleFilterChan} /> 
      </div>
    )
}

export default Filter;