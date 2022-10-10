import React from 'react'
import axios from 'axios'

import arrow from "../assets/arrow.png"
import "../App.css"


class Boxes extends React.Component {
  constructor() {
    super()
    this.state = {
      entities: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/getTranscripts').then((res) => {
      this.setState({
        entities: res.data
      })
    })
  }

  render() {
    if (this.state.entities[0]) {
      return (
        <div className="box-container">
          {this.state.entities[0].map(entity => (
            <div key={entity.id} className="arrow-entity">
              <div className="entity">
                {entity.content}
              </div>
              <img src={arrow} alt="arrow" width="200px" className="arrow" key={entity.id} id={entity.id}></img>
            </div>
          ))}
        </div>
      )
    }
    else{
      return(<div></div>)
    }
  }
}

export default Boxes