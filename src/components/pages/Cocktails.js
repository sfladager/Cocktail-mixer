
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

//bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

const Cocktails = () => {

  // state to hold list of drinks
  const [ drinkList, setDrinkList ] = useState([])
  const [ vodkaList, setVodkaList ] = useState([])
  const [ ginList, setGinList ] = useState([])
  const [ tequilaList, setTequilaList ] = useState([])
  const [ bourbonList, setBourbonList ] = useState([])
  const [ filteredDrinks, setFilteredDrinks ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ drinksByName, setDrinksByName ] = useState('')
  // state to hold errors if present, set to null initially
  // const [ errors, setErrors ] = useState(null)

  // get list of drinks with axios using the get request 
  useEffect(() => {
    const getDrinks = async () => {
      try {
        const { data } = await axios.get('www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
        setVodkaList(data.drinks)
      } catch (err) {
        console.log(err.message)
        // setErrors(err.)
      }
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin')
        setGinList(data.drinks)
      } catch (err) {
        console.log(err.message)
        // setErrors(true)
      }
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila')
        setTequilaList(data.drinks)
      } catch (err) {
        console.log(err.message)
        // setErrors(true)
      }
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon')
        setBourbonList(data.drinks)
      } catch (err) {
        console.log(err.message)
        // setErrors(true)
      }
    }
    getDrinks()
  }, [])

  //Creates a new array with all drinks added into it.
  useEffect(() => {
    setDrinkList([ ...vodkaList, ...ginList, ...tequilaList, ...bourbonList])
  }, [vodkaList, ginList, tequilaList, bourbonList])

  // Removes duplicate drinks from the array
  const removeDuplicates = useCallback(() => {
    const removeDupesArr = []
    drinkList.forEach(drink => {
      if (!removeDupesArr.map(drink => drink.idDrink).includes(drink.idDrink))
      removeDupesArr.push(drink)
    })
    setFilteredDrinks(removeDupesArr)
  }, [drinkList])
  // Runs the remove duplicate function
  useEffect(() => {
    removeDuplicates()
  }, [drinkList, removeDuplicates])

  // With dropdown menu, searches by alcohol type, and includes text search by name
  const handleChange = (e) => {
    const filtered = e.target.value
    if (filtered === 'all' && drinksByName) {
      console.log('drinkList ->',drinkList)
      return setFilteredDrinks(removeDuplicates)
    } else if (filtered === 'vodkaList' && drinksByName) {
      console.log('vodka list ->', vodkaList)
      return setFilteredDrinks(vodkaList)
    } else if (filtered === 'ginList' && drinksByName) {
      console.log('gin list ->', ginList)
      return setFilteredDrinks(ginList)
    } else if (filtered === 'tequilaList' && drinksByName)  {
      console.log('tequila ->', tequilaList)
      return setFilteredDrinks(tequilaList)
    } else if (filtered === 'bourbonList' && drinksByName)  {
      console.log('bourbonList ->', bourbonList)
      return setFilteredDrinks(bourbonList)
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
    }, [drinkList, vodkaList, ginList, tequilaList, search, filteredDrinks, bourbonList])

  return (
    <main className="list-page">
      <Container className="mt-4">
        <div className="filter-container mb-3">
          {drinkList && vodkaList && tequilaList && ginList && filteredDrinks && bourbonList &&
            <>
              <select onChange={handleChange} name="drink-type" id="drink-type" placeholder="All">
                <option id="all" value="all">All</option>
                <option id="bourbon" value="bourbonList">Bourbon</option>
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