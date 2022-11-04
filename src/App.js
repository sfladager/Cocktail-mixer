//react router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// create routes for each page
import Home from './components/pages/Home'
import NavBarSection from './components/common/NavBarSection'
import RandomCocktail from './components/pages/RandomCocktail'
import NotFound from './components/pages/NotFound'
import CocktailSingle from './components/pages/CocktailSingle'
import Cocktails from './components/pages/Cocktails'
import Gin from './components/pages/Gin'
import Tequila from './components/pages/Tequila'
import Champagne from './components/pages/Champagne'
// import Beer from './components/pages/Beer'


//import components



const App = () => {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <NavBarSection />
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/Gin" element={<Gin />} />
          <Route path="/tequila" element={<Tequila />} />
          <Route path="/champagne" element={<Champagne />} />
          {/* <Route path="/beer" element={<Beer />} /> */}
          <Route path="/cocktailSingle/:drinkId" element={<CocktailSingle />} />
          <Route path="/random" element={<RandomCocktail />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App