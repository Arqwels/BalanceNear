import Footer from "./components/Footer/Footer"
import Item from "./components/Item/Item"
import Search from "./components/Search/Search"



const App = () => {
  return (
    <div className="container">
      <header className="header">
        <Search />
      </header>
      <main>
        <Item />
        <Item />
        <Item />
      </main>
      <Footer />
    </div>
  )
}

export default App