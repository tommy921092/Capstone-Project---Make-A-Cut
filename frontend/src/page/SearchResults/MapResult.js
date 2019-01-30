import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

const appID = process.env.REACT_APP_API_KEY;

class Map extends Component {

  componentDidUpdate(prevProps, _prevState) {
    // console.log(prevProps.list);
    // console.log(this.props.list);
    // console.log(appID)
    if(prevProps.list !== this.props.list){
      this.renderMap()
    }
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${appID}&callback=initMap`)
    window.initMap = this.initMap
  }

  initMap = () => {

    // create a map
    var point = { lat: 22.2990446, lng: 114.1639289 };
    // Add window.google... to fix is not defined error
    var map = new window.google.maps.Map(document.getElementById('map'), { zoom: 14, center: point });

    // create an info window
    var infoWindow = new window.google.maps.InfoWindow()

    // display dynamic markers
    this.props.list.map(l => {

      var contentString = `${l.name}`

      // create a marker
      var points = { lat: parseFloat(l.lat), lng: parseFloat(l.lng) };
      var marker = new window.google.maps.Marker({
        position: points,
        map: map,
        title: l.name
      });

      // click on a marker
      marker.addListener('click', function () {

        // change the content
        infoWindow.setContent(contentString)

        // open an infowindow
        infoWindow.open(map, marker)
      })
    })
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