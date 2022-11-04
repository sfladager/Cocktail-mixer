
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

// BONUS -> add filter to search by name

const Cocktails = () => {

  // state to hold list of drinks
  const [ drinkList, setDrinkList ] = useState([])
  const [ vodkaList, setVodkaList ] = useState([])
  const [ ginList, setGinList ] = useState([])
  const [ tequilaList, setTequilaList ] = useState([])
  const [ filteredDrinks, setFilteredDrinks ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ drinksByName, setDrinksByName ] = useState('')
  // state to hold errors if present, set to null initially
  // const [ errors, setErrors ] = useState(false)

  // get list of drinks with axios using the get request 
  useEffect(() => {
    const getDrinks = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
        setVodkaList(data.drinks)
      } catch (err) {
        console.log(err)
        // setErrors(true)
      }
    }
    getDrinks()
  }, [])

  useEffect(() => {
    const getMoreDrinks = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
        setGinList(data.drinks)
      } catch (err) {
        console.log(err)
        // setErrors(true)
      }
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila')
        setTequilaList(data.drinks)
      } catch (err) {
        console.log(err)
        // setErrors(true)
      }
    }
    getMoreDrinks()
  }, [])

  useEffect(() => {
    setDrinkList([ ...vodkaList, ...ginList, ...tequilaList ])
    setFilteredDrinks([ ...vodkaList, ...ginList, ...tequilaList ])
  }, [vodkaList, ginList, tequilaList])

  

  const handleChange = (e) => {
    const filtered = e.target.value
    if (filtered === 'all' && drinksByName) {
      console.log('drinkList ->',filtered)
      return setFilteredDrinks(drinkList)
    } else if (filtered === 'vodkaList' && drinksByName) {
      console.log('vodka list ->', vodkaList)
      return setFilteredDrinks(vodkaList)
    } else if (filtered === 'ginList' && drinksByName) {
      console.log('gin list ->', ginList)
      return setFilteredDrinks(ginList)
    } else if (filtered === 'tequilaList' && drinksByName)  {
      console.log('tequila ->', tequilaList)
      return setFilteredDrinks(tequilaList)
    }
    }

  // takes input from search bar
  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }
  //updates state with regex from search state and filters array of drinks by name
    useEffect(() => {
      const regex = new RegExp(search, 'i')
      const searchName = filteredDrinks.filter(drink => {
        return regex.test(drink.strDrink)
      })
      setDrinksByName(searchName)

    }, [drinkList, vodkaList, ginList, tequilaList, search, filteredDrinks])

  return (
    <main className="list-page">
      <Container className="mt-4">
        <div className="filter-container mb-3">
          {drinkList && vodkaList && tequilaList && ginList && filteredDrinks && 
            <>
              <select onChange={handleChange} name="drink-type" id="drink-type" placeholder="All">
                <option id="all" value="all">All</option>
                <option id="vodka" value="vodkaList">Vodka</option>
                <option id="gin" value='ginList'>Gin</option>
                <option id="tequila" value='tequilaList'>Tequila</option>
              </select>   
              <input onChange={handleSearchInput} placeholder="Search..." id="search" />
            </>
          }
        </div>
        <Row>
          {drinksByName.length > 0 && 
          drinksByName.map(drink => {
            const { strDrink, strDrinkThumb, idDrink } = drink
            return (
              <Col xs="10" sm="6" lg="4" className='drink-card mb-4' key={idDrink}>
                <Link to={`/cocktailSingle/${idDrink}`}>
                  <Card>
                    <div className="card-image" style={{ backgroundImage: `url(${strDrinkThumb})` }}>
                    </div>
                    <Card.Title>{strDrink}</Card.Title>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </main>
  )
}

export default Cocktails