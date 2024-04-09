import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Catalog from './components/catalog/Catalog.jsx'
import PizzaDetails from './components/pizza_details/PizzaDetails.jsx'
import NewPizza from './components/create_pizza/CreatePizza.jsx'
import EditPizza from './components/edit_pizza/EditPizza.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Catalog />
      },
      {
        path: "pizzas/:id",
        element: <PizzaDetails />
      },
      {
        path: "pizzas/new",
        element: <NewPizza />
      },
      {
        path: "pizzas/edit/:id",
        element: <EditPizza />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
