import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingId: null,
      location: "",
      longitude: "",
      latitude: "",
      nearBy: []
    }
  }

  componentDidMount() {
    var listingId = window.location.href.split('/')[3];
    axios.get(`/explore/${listingId}`)
      .then(res => {
        console.log(res.data)

        this.setState({
          listingId: res.data.listingId,
          location: res.data.place,
          longitude: res.data.longitude,
          latitude: res.data.latitude,
          nearBy: res.data.nearBy
        })
      })
      .catch(err => {
        console.log('failed to get data for listing: ', err);
      })

  }

  render() {
    return (
      <div>
        <h1>EXPLORE</h1>
      </div>
    );
  }
}

export default App;