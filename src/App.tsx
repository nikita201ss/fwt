// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from './hooks/redux'
// import { fetchAuthors } from './store/reducers/ActionCreators'
import Header from './components/Header'
import PaintingContainer from './components/PaintingContainer'

import './style/style.scss'

function App() {
  // const dispatch = useAppDispatch()
  // const {authors, isLoading, error} = useAppSelector(state => state.authorReducer)

  // useEffect(() => {
  //   dispatch(fetchAuthors())
  // }, [])

  return (
    <>

      {/* {isLoading && <h2>Идет загрузка</h2>}
      {error && <h2>{error}</h2>}
      {JSON.stringify(authors, null, 2)}
     */}
      <Header />

      <PaintingContainer />



    </>
  )
}

export default App
