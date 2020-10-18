import Link from 'next/link'

const ConsoleLog = ({ children }) => {
console.log(children);
return false;
};

class CoinGecko extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      hourPercent: null,
      dayPercent: null,
      weekPercent: null,
      hourShow: true,
      dayShow: true,
      weekShow: true,
      allShow: false
    };
  };


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
  };
  // Function to set the input that controls whether the column (1h, 24h, 7d) is shown
  setInput = (key) => (event) => {
    this.setState(prevState => ({ [key]: !prevState.[key] }));
  };
  // Function to set the percentage shown 
  setPercentage = (key) => (event) => {
     this.setState({ [key]: event.target.value})
  };
  // Function to reset all values back to the original state and clear inputs
  resetScreen() {
    document.getElementById('setting').reset();
    this.setState({
      hourPercent: null,
      dayPercent: null,
      weekPercent: null,
      hourShow: true,
      dayShow: true,
      weekShow: true
    })
  };

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {/* Show other options button */}
          <div className='flex items-center justify-center'>
            <Link href="/">
              <a className="bg-transparent hover:bg-purple-600 text-purple-600 font-semibold 
                hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded" 
                onClick={this.setInput('allShow')}>{this.state.allShow ? 'Hide' : 'Show'} Options</a>
            </Link>
          </div>
          <form id='setting' className={"grid grid-cols-3 gap-4 py-2 " + (this.state.allShow ? '' : 'checked')}> 
            {/* Logic to arrange the hourly data */}
            <div className='border-solid border-2 border-grey-500 rounded p-4 text-center'>
              <h1 className="text-xl font-semibold underline">Hourly</h1>
              <span>Hourly percentage ></span>
              <input type='number' className='px-4 py-3 w-32' placeholder='Show all' name='hourPercent' value={this.props.value}
                onChange={this.setPercentage('hourPercent')}></input>
              <br/>              
              <input type="checkbox" id="hour" name="hour" value="1 Hour" onChange={this.setInput('hourShow')} />
              <label className='px-4 py-3' htmlFor="hour">Remove hourly % change</label>
            </div>
            {/* Logic to arrange the daily data */}
            <div className='border-solid border-2 border-grey-500 rounded p-4 text-center'>
              <h1 className="text-xl font-semibold underline">Daily</h1>
              <span>Daily percentage ></span>
              <input type='number' className='px-4 py-3 w-32' placeholder='Show all' name='dayPercent' value={this.props.value}
                onChange={this.setPercentage('dayPercent')}></input>
              <br/>
              <input type="checkbox" id="day" name="day" value="1 Day" onChange={this.setInput('dayShow')} />
              <label htmlFor="day">Remove daily % change</label>
            </div>
            {/* Logic to arrange the weekly data */}
            <div className='border-solid border-2 border-grey-500 rounded p-4 text-center'>
              <h1 className="text-xl font-semibold underline">Weekly</h1>
              <span>Weekly percentage ></span>
              <input type='number' className='px-4 py-3 w-32' placeholder='Show all' name='weekPercent' 
              value={this.props.value} onChange={this.setPercentage('weekPercent')}></input>
              <br/>
              <input type="checkbox" id="week" name="week" value="1 Week" onChange={this.setInput('weekShow')} />
              <label htmlFor="week">Remove weekly % change</label>
            </div>
          </form>
          {/* Reset button */}
          <div className={'flex items-center justify-center ' + (this.state.allShow ? '' : 'checked')}>
          <Link href="/">
              <a className="bg-transparent hover:bg-red-600 text-red-600 font-semibold 
                hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded" 
                onClick={() => this.resetScreen()}>Reset Screen</a>
            </Link>
            </div>          

          <div className='container mx-auto flex items-center justify-center'>
            <table className='table-auto'>
              <thead className='text-xl'>
                <tr>
                  <th className="px-4 py-2">Position</th>
                  <th className="px-4 py-2">Symbol</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price (USD)</th>
                  <th className={"px-4 py-2 " + (this.state.hourShow ? '' : 'checked' )}>% Change in 1h</th>
                  <th className={"px-4 py-2 " + (this.state.dayShow ? '' : 'checked' )}>% Change in 24h</th>
                  <th className={"px-4 py-2 " + (this.state.weekShow ? '' : 'checked' )}>% Change in 7d</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.name} className={
                    ( !this.state.weekPercent ? null : item.price_change_percentage_7d_in_currency >= 
                      this.state.weekPercent ? '' : ' checked ' ) + 
                    ( !this.state.dayPercent ? null : item.price_change_percentage_24h_in_currency >= 
                      this.state.dayPercent ? '' : ' checked ' ) +
                    ( !this.state.hourPercent ? null : item.price_change_percentage_1h_in_currency >= 
                      this.state.hourPercent ? '' : ' checked ' )
                  }>
                    <td className="border px-4 py-2">{item.market_cap_rank}</td>
                    <td className="border px-4 py-2 items-center"><img className='justify-center' src={item.image} 
                      alt='coin name' width='20' /></td>
                    <td className="border px-4 py-2">
                        <a className='text-purple-600 font-medium hover:text-red-800' 
                          href={'https://www.coingecko.com/en/coins/' + item.id}>
                          {item.name}
                        </a>
                    </td>
                    {/* A JSX comment */}
                    <td className="border px-4 py-2">${Math.round(item.current_price * 1000) / 1000}</td>
                    <td className={( this.state.hourShow ? '' : 'checked ' ) +
                      ( item.price_change_percentage_1h_in_currency >= 0 ? 'text-green-500 border px-4 py-2' : 
                      'text-red-500 border px-4 py-2' )}>{Math.round(item.price_change_percentage_1h_in_currency * 100) / 100}%
                    </td>
                    {/* A JSX comment */}
                    <td className={( this.state.dayShow ? '' : 'checked ' ) +
                      ( item.price_change_percentage_24h_in_currency >= 0 ? 'text-green-500 border px-4 py-2' : 
                      'text-red-500 border px-4 py-2' )}>{Math.round(item.price_change_percentage_24h_in_currency * 100) / 100}%
                    </td>
                    {/* A JSX comment */}
                    <td className={( this.state.weekShow ? '' : 'checked ' ) +
                      (item.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500 border px-4 py-2' : 
                      'text-red-500 border px-4 py-2' )}>{Math.round(item.price_change_percentage_7d_in_currency * 100) / 100}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
};

export default CoinGecko
