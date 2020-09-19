import Nav from '../components/nav'
import CoinGecko from '../components/cg'

export default function IndexPage() {
  return (
    <div>
      <Nav />
      <div className='container mx-auto py-20'>
        <h1 className='text-5xl text-center text-accent-1 pb-8'>
          CoinGecko Data Simple Viewer
        </h1>
        <span>Select the hourly increase percentage to show:</span>
        <input type='text' className='px-4 py-3' placeholder='Show all hourly increase'></input>
        <CoinGecko />
      </div>
    </div>
  )
}
