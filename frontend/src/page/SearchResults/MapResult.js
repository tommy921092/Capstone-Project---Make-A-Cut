import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Geocode from 'react-geocode'

const appID = process.env.REACT_APP_API_KEY;

Geocode.setApiKey(appID);
Geocode.enableDebug();

class Map extends Component {
  constructor(props) {
    super(props)
    this.markers = []
    this.infoWindow = null
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.list !== this.props.list) {
      this.markers = []; // reset on each render
      this.renderMap();
    }

    console.log(this.props.selectedItem);
    if (this.props.selectedItem) {
      let selectedMarker = this.markers.find(m => {
        return m.id === this.props.selectedItem.id;
      });
      this.showInfoWindow(selectedMarker);
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
    var bounds = new window.google.maps.LatLngBounds();
    // create an info window
    this.infoWindow = new window.google.maps.InfoWindow()
    // display dynamic markers
    this.props.list.map(l => {

      // infoWindow styling
      var contentString = `<h3 style="margin-bottom: 0.2em"><a href="/shop/${l.id}">${l.shopname}</a></h3> 
                            <p style="font-weight: 500; margin-bottom: 0.2em">${l.address}</p>
                            <p style="margin-bottom: 0.2em">${l.address_2}</p>`

      // convert address to lnglat
      Geocode.fromAddress(l.address_2).then(
        response => {
          // return coordinates of address
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          var points = { lat, lng }
          // create markers
          var marker = new window.google.maps.Marker({
            id: l.id,
            position: points,
            map: map,
            content: contentString,
            name: l.shopname
          });

          // opening markers on click
          marker.addListener('click', () => {
            this.showInfoWindow(marker);
          });
          bounds.extend(marker.getPosition());
          // markers pushed into an array of currently displayed markers - so that they can be selected from SearchResult list
          this.markers.push(marker);
          console.log(this.markers);

        },
        error => {
          console.error(error);
        }
      )
    })
  }

  showInfoWindow(marker) {
    if (marker) {
      this.infoWindow.setContent(
        marker.content
      );
      // open an infowindow
      this.infoWindow.open(marker.map, marker);
    }
    return null
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