import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import './style/style.scss'
import { fetchAuthors } from './store/reducers/ActionCreators'


function App() {
    const dispatch = useAppDispatch()
    const {authors, isLoading, error} = useAppSelector(state => state.authorReducer)
  
    useEffect(() => {
      dispatch(fetchAuthors())
    }, [])

    return (
    <>
    <header><p>Hello</p></header>
      {isLoading && <h2>Идет загрузка</h2>}
      {error && <h2>{error}</h2>}
      {JSON.stringify(authors, null, 2)}
    
    </>
  )
}

export default App
