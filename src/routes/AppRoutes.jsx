import React from 'react'
import { Routes  , Route} from 'react-router-dom'
import Home from '../pages/Home'
import FindLead from '../pages/FindLead'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search-leads' element={<FindLead />} />
    </Routes>
  )
}

export default AppRoutes