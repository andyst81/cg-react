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
        <CoinGecko />
      </div>
    </div>
  )
}
