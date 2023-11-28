import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  state = {matchData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  updatedData = each => ({
    umpires: each.umpires,
    result: each.result,
    manOfTheMatch: each.man_of_the_match,
    id: each.id,
    date: each.date,
    venue: each.venue,
    competingTeam: each.competing_team,
    competingTeamLogo: each.competing_team_logo,
    firstInnings: each.first_innings,
    secondInnings: each.second_innings,
    matchStatus: each.match_status,
  })

  getTeamData = async () => {
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      updatedMatch: this.updatedData(data.latest_match_details),
      updatedRecentMatches: data.recent_matches.map(each =>
        this.updatedData(each),
      ),
    }

    this.setState({
      matchData: formattedData,
      isLoading: false,
    })
  }

  getBackgroundColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return id
  }

  render() {
    const {matchData, isLoading} = this.state
    const {teamBannerUrl, updatedMatch, updatedRecentMatches} = matchData

    return (
      <div className="background">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className={`card-team-matches ${this.getBackgroundColor()}`}>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-match-img"
            />
            <div className="latest-match-card">
              <LatestMatch key={updatedMatch.id} updatedMatch={updatedMatch} />
            </div>
            <div>
              <ul className="listed">
                {updatedRecentMatches.map(each => (
                  <MatchCard key={each.id} updatedRecentMatches={each} />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
