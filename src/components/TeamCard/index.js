import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {details} = props
  const {name, id, teamImageUrl} = details
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="team-card">
        <img src={teamImageUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default TeamCard
