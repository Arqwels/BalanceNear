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
        <Item 
          nickname="vector79.tg"
          balanceNear={1.3819}
          balanceHot={4.717904}
        />
        <Item 
          nickname="7343364109.tg"
          balanceNear={2.3819}
          balanceHot={20.351571}
        />
        <Item 
          nickname="arqwels.tg"
          balanceNear={1.9819}
          balanceHot={28.997534}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App