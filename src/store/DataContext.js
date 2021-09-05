import React from 'react'
import { products } from '../UserData'

const DataContext = React.createContext( {
     data:products
})

export default DataContext
