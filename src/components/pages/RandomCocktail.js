import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const CocktailRandom = () => {

  const [drink, setDrink] = useState(null)

  useEffect(() => {
    const getDrink = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        setDrink(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getDrink()
  }, [])

  function newRandom() {
    const getDrink = async () => {
      try {
        const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        setDrink(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getDrink()
  }

  return (
    <main className='random-page'>
      <Container className='mt-4'>
        <Row>
          {drink &&
            drink.drinks.map(drink => {
              const { idDrink, strDrink, strDrinkThumb, strGlass, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10 } = drink
              console.log(strDrink)
              return (
                <>
                  <Col key={idDrink} sm="12" md="12" lg="10" className='drink-card mb-4 ml-4 mr-6'>
                    <Card>
                      <div className="card-container">
                        <div className="card-image" style={{ backgroundImage: `url(${strDrinkThumb})` }}>
                        </div>
                        <Card.Body className='card-body'>
                          <Card.Title className="card-title mb-0">{strDrink} <br></br></Card.Title>
                          <Card.Text>{strIngredient1}<br></br>{strIngredient2}<br></br>{strIngredient3}<br></br>{strIngredient4}<br></br>{strIngredient5}<br>
                          </br>{strIngredient6}<br></br>{strIngredient7}<br></br>{strIngredient8}<br></br>{strIngredient9}<br></br>{strIngredient10}</Card.Text>
                          <Card.Text className='card-text mb-0'>&#129347; :   {strGlass}</Card.Text>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col >
                  <Link onClick={newRandom} to="/random" className='btn btn-primary'>Next random cocktail</Link>
                </>
              )
            })
          }
        </Row >
      </Container >
    </main >
  )

}

export default CocktailRandom