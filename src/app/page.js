import HomePage from '../pages/HomePage'
import '../styles/global.css'
// import FactDisplay from '../components/FactDisplay'
export default function Home() {
  return (
    <main>
      <h1 className='title'>Gebeya Carbon Footprint Calculator</h1>
      <HomePage/>
      {/* <FactDisplay/> */}
    </main>
  )
}
