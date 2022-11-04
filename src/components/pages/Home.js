import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='hero-page'>
      <div className='hero-home mt-4'>
        <h1 className='display-3'>Welcome to SEI cocktails</h1>
        <h5>Want a break from coding? Explore our wide range of drinks</h5>
        <p>or find some inspiration with our random drink selector</p>
        <Link to='/random' className='btn btn-primary btn-home mt-1'>Pick A Random Cocktail</Link>
      </div>
    </div>
  )
}

export default Home