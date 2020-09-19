import Nav from '../components/nav'
import CoinGecko from '../components/cg'

export default function IndexPage() {
  return (
    <div>
      <Nav />
      <div className="container mx-auto py-20">
        <h1 className="text-5xl text-center text-accent-1">
          CoinGecko API Data Manipulator
        </h1>
        <CoinGecko />
      </div>
    </div>
  )
}
