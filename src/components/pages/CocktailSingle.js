
import { useState, useEffect } from 'react'

import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const CocktailSingle = () => {

  // state to hold list of drinks
  const [ drinkInfo, setDrinkInfo ] = useState(null)
  // state to hold errors if present, set to null initially


  // useParams to capture ID and input into get request
  const { drinkId } = useParams()

  //Wrap get request in useEffect which is tripped when drinkId is updated
  // send get request for specific drink by id selected from main list
  // deconstruct object to pull name, image, instructions, ingredients, glass type, BONUS Measurements
  useEffect(() => {
    const getDrinkInfo = async () => {
      try {
        const { data } = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        setDrinkInfo(data.drinks[0])
      } catch (err) {
        console.log(err)
      }
    }
    getDrinkInfo()
  }, [drinkId])


  // In JSX display the data pulled from the object specified above

  return (
    <main className="single-drink">
      <Container className="mt-4">
        {drinkInfo && 
          <Row>
            <h1 className="mb-4">{drinkInfo.strDrink}</h1>
            <hr />
            <Col md="6">
              <img className="drink-img" src={drinkInfo.strDrinkThumb} alt={drinkInfo.strDrink} />
            </Col>
            <Col md="6">
              <h3>Glass Type</h3>
              <p>{drinkInfo.strGlass}</p>
              <hr />
              <h3>Instructions</h3>
              <p>{drinkInfo.strInstructions}</p>
              <hr />
              <h3>Ingredients</h3>
              <p>desc</p>
              <hr />
              <h3>Measurements</h3>
              <p>desc</p>
              <hr />
              <Link to="/cocktails" className="btn btn-main">Find Another Drink</Link>
            </Col>
          </Row>
        }
        
      </Container>
    </main>
  )
}

export default CocktailSingle