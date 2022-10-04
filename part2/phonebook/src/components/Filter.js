import React from 'react'

// filter component
const Filter = ({ filter, handleFilter }) => <>filter shown with:< input name='search' value={filter} onChange={handleFilter} /></>
export default Filter