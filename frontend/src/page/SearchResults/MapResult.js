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

    console.log('current selected item : ', this.props.selectedItem);
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
    var point = { lat: 22.3002358, lng: 114.1788634 };
    // Add window.google... to fix is not defined error
    var map = new window.google.maps.Map(document.getElementById('map'), { zoom: 14, center: point });
    // create an info window
    this.infoWindow = new window.google.maps.InfoWindow()
    var bounds = new window.google.maps.LatLngBounds();
    // display dynamic markers
    var address_count = 0;
    this.props.list.map(l => {

      address_count++; // counter check for google map bounds logic
      // infoWindow styling
      var contentString = `<h3 style="margin-bottom: 0.2em"><a href="/shop/${l.id}">${l.shopname}</a></h3> 
                            <p style="font-weight: 500; margin-bottom: 0.2em">${l.address}</p>
                            <p style="margin-bottom: 0.2em">${l.address_2}</p>`

      // convert address to lnglat
      Geocode.fromAddress(l.address_2).then(
        response => {
          // return coordinates of address
          const { lat, lng } = response.results[0].geometry.location;
          // console.log(lat, lng);
          var points = { lat, lng }
          console.log(points);
          // console.log(points.lat, points.lng)
          // create markers
          var marker = new window.google.maps.Marker({
            id: l.id,
            position: points,
            map: map,
            content: contentString,
            name: l.shopname
          });
          console.log(marker);

          // opening markers on click
          marker.addListener('click', () => {
            this.showInfoWindow(marker);
          });
          console.log(marker.position); // not returning coordinates as desired
          bounds.extend( marker.position );
          // markers pushed into an array of currently displayed markers - so that they can be selected from SearchResult list
          this.markers.push(marker);
          console.log(this.markers.length, address_count);
        },
        error => {
          console.error(error);
        }
      )
    })

    if((this.markers.length == address_count) && (this.markers.length > 0)) {
      map.fitBounds(bounds); // currently not working - geocoder latlng points are not being passed to marker in time
    }
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