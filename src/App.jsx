import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Base64Tool from "./app/Base64Tool"
import Root from "./components/Root"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>} >
        <Route index  element={<Base64Tool/>}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
