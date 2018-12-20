import React from 'react'

const CalendarLabels = ({ labels }) => {
  return (
    <nav className="calendarLabels--container">
      <ul className="calendarLabels--list">
        {labels.map(label => (
          <li key={label} className="calendarLabels--item">
            <span
              className={`calendarLabels--bullet event--${label
                .replace(/\s+/g, '-')
                .toLowerCase()}`}
            />
            <p>{label}</p>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CalendarLabels
