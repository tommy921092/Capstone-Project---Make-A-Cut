import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

const appID = process.env.REACT_APP_API_KEY;

class Map extends Component {

  componentDidMount() {
    console.log(appID)
    this.renderMap()
  }

  renderMap = (props) => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${appID}&callback=initMap`)
    window.initMap = this.initMap
  }

  initMap = () => {
    // The location of Uluru
    var point = { lat: 22.296773, lng: 114.174727 };
    // The map, centered at Uluru - add window.google... to fix is not defined error
    var map = new window.google.maps.Map(document.getElementById('map'), { zoom: 15, center: point });
    // The marker, positioned at Uluru
    var marker = new window.google.maps.Marker({ position: point, map: map });
  }

  render() {
    return (
      <Container>
        <div id="map"></div>
      </Container>
    )
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script") // this creates our <script></script>
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Map
