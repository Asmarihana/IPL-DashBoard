import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {matchLists: [], isLoading: true}

  componentDidMount() {
    this.getMatchData()
  }

  getMatchData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({matchLists: updatedData, isLoading: false})
  }

  render() {
    const {matchLists, isLoading} = this.state
    return (
      <div className="home-page">
        <div className="home">
          <div className="Ipl-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1>IPL Dashboard</h1>
          </div>
          <div>
            {isLoading ? (
              <div data-testid="loader">
                <Loader type="Oval" color="#ffffff" height={50} width={50} />
              </div>
            ) : (
              <ul className="list">
                {matchLists.map(each => (
                  <TeamCard details={each} key={each.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
