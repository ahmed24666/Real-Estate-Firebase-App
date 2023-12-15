import { createBrowserRouter, RouterProvider, Outlet, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import './app.scss'
import Properties from "./Component/Properties/Properties";
import Nav from "./Component/Nav/Nav";
import Footer from "./Component/Footer/Footer";
import Search from "./Pages/Search";
import { getProperties } from "./utils/fetchApi";
import { useEffect, useState } from "react";
import DetailedPage from "./Pages/DetailedPage";
import Loader from "./Component/Loader/Loader";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AddProperty from "./Pages/AddProperty";
import useAuth from "./custom-hook/useAuth";
import useGetData from "./custom-hook/useGetData";
function App() {

  const [propertiesForSale, setPropertiesForSale] = useState([])
  const [propertiesForRent, setPropertiesForRent] = useState([])
  const [purpose, setpurpose] = useState(null)
  // loading 
  const [loading, setLoading] = useState(true)
  
  
  
  const { dataLoading } = useGetData('products')
  useEffect(() => {

    // // get properties for sale 
    // getProperties('properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6').then((data)=>{
    //   setPropertiesForSale(data.hits)
    //   console.log(data.hits)
      
    // })    
    // // get properties for rent 
    // getProperties('properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6').then((data)=>{
    //   setPropertiesForRent(data.hits)
    // })
    
      setLoading(false)
  }, [dataLoading])
  
  const Layout = () => {
    
    return (
      <div className="app">
        {loading ? <Loader /> : (
          <>
            <Nav purpose={purpose} setpurpose={setpurpose} />
            <Outlet />
            <Footer />
          </>
        )}
      </div>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home propertiesForSale={propertiesForSale} propertiesForRent={propertiesForRent} />
        },
        {
          path: "/properties/:id",
          element: <DetailedPage />
        },
        {
          path: "/search",
          element: <Search purpose={purpose} setpurpose={setpurpose} />
        },
        {
          path: "/add-property",
          element: <AddProperty />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
