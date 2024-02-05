import '@/styles/globals.css'
import Navbar from "../components/navbar"
import  Footer from '../components/footer'
import { dataStore } from '.'
import { Provider } from 'react-redux'
export default function App({ Component, pageProps }) {
  return(
  <>
  <div className="">
  <Provider store={dataStore}>
  <Navbar/>
  <Component {...pageProps}  />
  </Provider>
  <Footer/>
  </div>
  </>
  )
}
