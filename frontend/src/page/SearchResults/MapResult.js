import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import { connect } from 'react-redux';
import { fetchShops } from '../../actions/index'

const appID = process.env.REACT_APP_API_KEY;

class Map extends Component {

  componentDidUpdate() {
    console.log(appID)
    console.log(this.props)
    this.renderMap()
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${appID}&callback=initMap`)
    window.initMap = this.initMap
  }

  // getVenues = () => {
  //   axios.get(`https://5c4548513858aa001418c3e2.mockapi.io/api/shops/`)
  //     .then(res => {
  //       console.log(res.data);
  //       const list = res.data;
  //       this.setState(
  //         { list }
  //         , this.renderMap()) // make sure that render occurs AFTER new state is set - setState is asynchronous
  //     })
  //     .catch(error => {
  //       console.log("ERROR! " + error)
  //     })
  // }

  initMap = () => {

    // create a map
    var point = { lat: 2, lng: -86 };
    // Add window.google... to fix is not defined error
    var map = new window.google.maps.Map(document.getElementById('map'), { zoom: 3, center: point });

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

// const mapStateToProps = state => {
//   return { list: state.searchResult }
// }

// export default connect(
//   mapStateToProps,{fetchShops})(Map);