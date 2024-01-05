import '@/styles/globals.css'
import Navbar from "../components/navbar"
import { dataStore } from '.'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return(
  <>
  <Provider store={dataStore}>
  <Navbar/>
  <Component {...pageProps}  />
  </Provider>
  </>
  )
}
