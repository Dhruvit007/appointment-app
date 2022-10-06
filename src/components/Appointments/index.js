import {Component} from 'react'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isStared: false,
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: v4(),
      title,
      date,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onStaredEvent = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isFavourite: !eachObj.isFavourite}
        }
        return eachObj
      }),
    }))
  }

  getStarredAppointment = () => {
    this.setState(prevState => ({isStared: !prevState.isStared}))
  }

  getStarredEvent = () => {
    const {appointmentList, isStared} = this.state
    if (isStared === true) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isFavourite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {date, title, isStared} = this.state

    const filteredArray = this.getStarredEvent()

    const staredClassName = isStared ? 'unstarred-btn' : 'starred-btn'

    return (
      <div className="container">
        <div className="contain-container">
          <div className="appointment-container">
            <div className="appointment-chidren-container">
              <div className="form-details-container">
                <h1 className="main-heading">Add Appointment</h1>
                <form className="form-container" onSubmit={this.onFormSubmit}>
                  <div className="name-input-container">
                    <label className="label" htmlFor="name">
                      TITLE
                    </label>
                    <input
                      value={title}
                      placeholder="Title"
                      className="input-element"
                      id="name"
                      type="text"
                      onChange={this.onTitleChange}
                    />
                  </div>
                  <div className="date-input-container">
                    <label className="label" htmlFor="date">
                      DATE
                    </label>
                    <input
                      value={date}
                      className="input-element"
                      id="date"
                      type="date"
                      onChange={this.onDateChange}
                    />
                  </div>
                  <button className="btn" type="submit">
                    Add
                  </button>
                </form>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr />
            <div className="list-container-header">
              <h1>Appointments</h1>
              <button
                onClick={this.getStarredAppointment}
                className={staredClassName}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointment-item-container">
              {filteredArray.map(eachEvent => (
                <AppointmentItem
                  onStaredEvent={this.onStaredEvent}
                  eachEvent={eachEvent}
                  key={eachEvent.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
