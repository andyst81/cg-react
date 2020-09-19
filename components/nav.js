import Link from 'next/link'

const links = [
  { href: 'https://coingecko.com', label: 'CoinGecko' },
  { href: 'https://vercel.com', label: 'Vercel' },
  { href: 'https://tailwind.com', label: 'Tailwind' },
  { href: 'https://bootlegninja.space', label: 'My Site' },
]

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center p-8">
        <li>
          <Link href="/">
            <a className="bg-transparent hover:bg-red-800 text-purple-600 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded">Home</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a href={href} className="bg-transparent hover:bg-red-800 text-purple-600 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  )
}
