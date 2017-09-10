import React, { Component }from 'react'
import { Alert, Button, StyleSheet, View, TextInput, Text } from 'react-native'

export default class ButtonBasics extends Component {

  constructor (props) {
    super(props);
    this._onButtonPress = this._onButtonPress.bind(this);
    this.state={ in1:'', in2:'', in3:'',lat:null, lng:null }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }
  
  componentDidMount () {
     if ('geolocation' in navigator) {
       navigator.geolocation.getCurrentPosition(pos => {
         let state = this.state
         state.lat = pos.coords.latitude
         state.lng = pos.coords.longitude
         this.setState(state)
       })
       this.watchId = navigator.geolocation.watchPosition(pos => {
         let state = this.state
         state.lat = pos.coords.latitude
         state.lng = pos.coords.longitude
         this.setState(state)
       },(error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
    }
  }
  
  _onTextChange (key, value) {
    let state = this.state
    state[key] = value
    this.setState(state)
  }
  
  _onButtonPress() {
    fetch('http://testing.maybe.davidvadney.com:12222/set',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      
    Alert.alert('You sent the data!' + JSON.stringify(this.state));
  }

  render () {
    return (
        <View style={styles.container}>
        <View>
        <Text >
        {(this.state.lat !== null) ? 'lat: ' + this.state.lat : ''}
        {(this.state.lng !== null) ? 'lng: ' + this.state.lng : ''}
        </Text>

        </View>
        <View>
        <TextInput
         placeholder="in1"
         style={styles.textform}
         onChangeText={this._onTextChange.bind(this,'in1')}
        />
        </View>
         <View >
        <TextInput
      placeholder="in2"
      style={styles.textform}
      onChangeText={this._onTextChange.bind(this,'in2')}
        />
        </View>
         <View >
        <TextInput
      placeholder="in3"
      style={styles.textform}
      onChangeText={this._onTextChange.bind(this,'in3')}
        />
      </View>
        <View style={styles.buttonContainer}>
        <Button onPress={this._onButtonPress}
      title="Press Me"
        />
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textform: {
    height:80
  }
})
