
import { useState, useEffect } from 'react'

//bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
// Container
// Row
// Col
// Cards

// BONUS -> add filter to search by name

const Vodka = () => {

  // state to hold list of drinks
  const [ drinkList, setDrinkList ] = useState([])
  // state to hold errors if present, set to null initially
  const [ errors, setErrors ] = useState(null)

  // get list of drinks with axios using the get request 
  useEffect(() => {
    const getDrinks = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
        setDrinkList(data.drinks)
        console.log(drinkList)
      } catch (err) {
        console.log(err)
      }
    }
    getDrinks()
  }, [])
  // deconstruct object to pull name and image


  //event listener with onClick when someone clicks on a card. 
  //This takes them to the single drink page

  // In JSX display the images in cards with a map function

  return (
    <main className="list-page">
      <Container className="mt-4">
        <Row>
          {drinkList.length > 0 && 
          drinkList.map(drink => {
            const { strDrink, strDrinkThumb, idDrink } = drink
            console.log(idDrink)
            return (
              <Col sm="6" lg="4" className='drink-card mb-4' key={idDrink}>
                <Card>
                  <div className="card-image" style={{ backgroundImage: `url(${strDrinkThumb})` }}>
                  </div>
                  <Card.Title>{strDrink}</Card.Title>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </main>
  )
}

export default Vodka