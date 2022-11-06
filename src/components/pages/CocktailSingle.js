
import { useState, useEffect } from 'react'

import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const CocktailSingle = () => {
  // state to hold list of drinks
  const [drinkInfo, setDrinkInfo] = useState(null)

  // useParams to capture ID and input into get request
  const { drinkId } = useParams()

  // Axios get request to pull single drink info based on drink id from previous page click
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
    <main className='random-page'>
      <Container className='mt-4'>
        {drinkInfo &&
          <Row>
            <Col sm="12" md="12" lg="10" className='drink-card mb-4 ml-4 mr-6'>
              <Card>
                <div className="card-container">
                  <div className="card-image" style={{ backgroundImage: `url(${drinkInfo.strDrinkThumb})` }}>
                  </div>
                  <Card.Body className='card-body'>
                    <Card.Title className="card-title mb-0">{drinkInfo.strDrink} <br></br></Card.Title>
                    <Card.Text>
                      <p>{drinkInfo.strIngredient1} <span> {drinkInfo.strMeasure1}</span></p>
                      <p>{drinkInfo.strIngredient2} <span> {drinkInfo.strMeasure2}</span></p>
                      <p>{drinkInfo.strIngredient3} <span> {drinkInfo.strMeasure3}</span></p>
                      <p>{drinkInfo.strIngredient4} <span> {drinkInfo.strMeasure4}</span></p>
                      <p>{drinkInfo.strIngredient5} <span> {drinkInfo.strMeasure5}</span></p>
                      <p>{drinkInfo.strIngredient6} <span> {drinkInfo.strMeasure6}</span></p>
                      <p>{drinkInfo.strIngredient7} <span> {drinkInfo.strMeasure7}</span></p>
                      <p>{drinkInfo.strIngredient8} <span> {drinkInfo.strMeasure8}</span></p>
                      <p>{drinkInfo.strIngredient9} <span> {drinkInfo.strMeasure9}</span></p>
                      <p>{drinkInfo.strIngredient10} <span> {drinkInfo.strMeasure10}</span></p>
                    </Card.Text>
                    <Card.Text className='card-text mb-0'>&#129347; :   {drinkInfo.strGlass}</Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col >
            <Link to="/cocktails" className="btn btn-main">Find Another Drink</Link>
          </Row >
        }
      </Container >
    </main >
  )
}

export default CocktailSingle