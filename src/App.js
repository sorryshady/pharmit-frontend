import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/Root'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import AddProductPage from './pages/AddProductPage'
import AddCategoryPage from './pages/AddCategoryPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/:productId', element: <ProductDetailsPage /> },
      { path: '/addProduct', element: <AddProductPage /> },
      { path: '/addCategory', element: <AddCategoryPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
])
function App() {
  return <RouterProvider router={router} />
}

export default App
