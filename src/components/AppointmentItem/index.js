import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachEvent, onStaredEvent} = props
  const {id, title, date, isFavourite} = eachEvent
  const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const imgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarClick = () => {
    onStaredEvent(id)
  }
  return (
    <li className="list-item">
      <div className="list-star-item">
        <p className="profession">{title}</p>
        <button className="btn-star" type="button" onClick={onStarClick}>
          <img className="star-image" src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="date">{formatedDate}</p>
    </li>
  )
}

export default AppointmentItem
