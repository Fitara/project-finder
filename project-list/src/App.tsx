import { RouterProvider } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import router from './routes/index'

function App(): JSX.Element {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
