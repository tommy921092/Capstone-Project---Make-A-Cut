import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import axios from 'axios';

const appID = process.env.REACT_APP_API_KEY;

class Map extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    console.log(appID)
    this.getVenues()
    // this.renderMap() // we want to initiate the map render only after the new state is set
  }
  
    renderMap = (props) => {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${appID}&callback=initMap`)
      window.initMap = this.initMap
    }

  getVenues = () => {
    axios.get(`https://5c4548513858aa001418c3e2.mockapi.io/api/shops/`)
      .then(res => {
        console.log(res.data);
        const list = res.data;
        this.setState(
          { list }
        , this.renderMap()) // make sure that render occurs AFTER new state is set
    })
    .catch(error => {
      console.log("ERROR! " + error)
    })
  }

  initMap = () => {
    var point = { lat: 0, lng: 0 };
    // Add window.google... to fix is not defined error
    var map = new window.google.maps.Map(document.getElementById('map'), { zoom: 0, center: point });
    this.state.list.map(l => {
      
      var points = { lat: parseFloat(l.lat), lng: parseFloat(l.lng) };
      var marker = new window.google.maps.Marker({ 
        position: points, 
        map: map,
        title: l.name
       });

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
