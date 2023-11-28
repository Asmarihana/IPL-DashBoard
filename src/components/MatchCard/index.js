import './index.css'

const MatchCard = props => {
  const {updatedRecentMatches} = props
  const {
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = updatedRecentMatches

  const getStatus = matchStatus === 'Won' ? 'match-win' : 'match-loss'
  return (
    <li className="recent-matches">
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={getStatus}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
