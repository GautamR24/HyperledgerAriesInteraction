import React from 'react'
import PropTypes from 'prop-types'
export default function Card(props) {
  return (
    <>
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h1 className="card-title">{props.title}</h1>
                <h1 className="card-subtitle mb-2 text-muted">Card subtitle</h1>
            </div>
        </div>
    </>
  )
}
