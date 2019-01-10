import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const renderBox = (title, data) => {
  const key = title.replace(/\s/g, '')
  const value =
    title.split(' ')[0] === 'fecha'
      ? moment(data[key])
          .utc()
          .format('MMMM D YYYY')
      : data[key]

  return <span className="box">{value}</span>
}

const AditionalInfo = ({ data, titles, handleSelect }) => {
  return (
    <nav className="calendarInfo--container">
      <ul className="calendarInfo--list">
        {titles.map(title => {
          return (
            <li key={title}>
              <h3>{title}</h3>
              {renderBox(title, data, handleSelect)}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

AditionalInfo.propTypes = {
  data: PropTypes.any.isRequired,
  titles: PropTypes.any.isRequired,
  handleSelect: PropTypes.func,
}

export default AditionalInfo
