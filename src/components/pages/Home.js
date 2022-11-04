

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className='hero-page text-center'>
      <div className='hero'>
        <h1 className='display-3'>Welcome to cocktails website</h1>
        <h2>Feeling adventurous?</h2>
        <Link to='/random' className='btn btn-main'>Pick a random cocktail</Link>
      </div>
    </main>
  )
}

export default Home