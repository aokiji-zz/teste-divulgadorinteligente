import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Products from '../pages/products/products'


const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootNavigation
