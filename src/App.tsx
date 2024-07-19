import { createContext } from 'react'
import './App.css'
import { MainPage } from './routes/MainPage'

export const AuthContext = createContext(false);

function App() {

  return (
    <AuthContext.Provider value={true}>
      <MainPage></MainPage>
    </AuthContext.Provider>
  )
}

export default App
