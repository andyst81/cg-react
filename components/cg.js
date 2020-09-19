class CoinGecko extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='containter mx-auto flex items-center justify-center'>
          <table className='table-auto'>
            <thead className='text-xl'>
              <tr>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price (USD)</th>
                <th className="px-4 py-2">% Change in 1h</th>
                <th className="px-4 py-2">% Change in 24h</th>
                <th className="px-4 py-2">% Change in 7d</th>
              </tr>
            </thead>
            <tbody>
            {data.map(item => (
              <tr key={item.name}>
                <td className="border px-4 py-2">{item.market_cap_rank}</td>
                <td className="border px-4 py-2"><img src={item.image} alt='coin name' width='20' /></td>
                <td className="border px-4 py-2">
                    <a className='text-purple-600 font-medium hover:text-red-900' href={'https://www.coingecko.com/en/coins/' + item.id}>

                      {item.name}

                    </a>
                </td>
                <td className="border px-4 py-2">${Math.round(item.current_price * 1000) / 1000}</td>
                <td className={item.price_change_percentage_1h_in_currency >= 0 ? 'text-green-500 border px-4 py-2' : 'text-red-500 border px-4 py-2'}>{Math.round(item.price_change_percentage_1h_in_currency * 100) / 100}%</td>
                <td className={item.price_change_percentage_24h_in_currency >= 0 ? 'text-green-500 border px-4 py-2' : 'text-red-500 border px-4 py-2'}>{Math.round(item.price_change_percentage_24h_in_currency * 100) / 100}%</td>
                <td className={item.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500 border px-4 py-2' : 'text-red-500 border px-4 py-2'}>{Math.round(item.price_change_percentage_7d_in_currency * 100) / 100}%</td>
              </tr>
          ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default CoinGecko
