import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Geocode from 'react-geocode'

const appID = process.env.REACT_APP_API_KEY;

Geocode.setApiKey(appID);
Geocode.enableDebug();

class Map extends Component {

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.list !== this.props.list) {
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
    var map = new window.google.maps.Map(document.getElementById('map'), { zoom: 13, center: point });

    // create an info window
    var infoWindow = new window.google.maps.InfoWindow()

    // display dynamic markers
    this.props.list.map(l => {

      var contentString = `<h3 style="margin-bottom: 0.2em">${l.shopname}</h3> 
                            <p style="font-weight: 500; margin-bottom: 0.2em">${l.address}</p>
                            <p style="margin-bottom: 0.2em">${l.description}</p>`

      // convert address to lnglat
      Geocode.fromAddress(l.address).then(
        response => {
          // return coordinates of address
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          var points = { lat, lng }
          // create markers
          var marker = new window.google.maps.Marker({
            position: points,
            map: map,
            title: l.name
          });

          marker.addListener('click', function () {

            infoWindow.setContent(contentString)
            // open an infowindow
            infoWindow.open(map, marker)
          }, error => {
            console.error(error);
          }
          )
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