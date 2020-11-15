import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Modal, Picker, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import { Text, View } from '../components/Themed';

let id = 0;
export default function TabThreeScreen() {
  const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [circles, setCircles] = React.useState<{latitude: number, longitude: number, radius: number, color: string}[]>([]);
  const [list, setList] = React.useState<'White List' | 'Black List'>("White List");
  const [tempVal, setTempVal] = React.useState('');
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location: Location.LocationObject;
      try {
        location = await Location.getCurrentPositionAsync({});
      } catch (e) {
        location = {coords: {longitude: -96.788422, latitude: 33.074760, altitude: null, accuracy: null, altitudeAccuracy: null, heading: null, speed: null}, timestamp: 0};
      }
      setLocation(location);
    })();
  }, []);
  return (
    <View style={{flex: 1}}>
      <MapView initialRegion={{
        latitude: 33.074760,
        longitude: -96.788422,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }} style={{width: '100%', height: '100%'}}>
        <Marker coordinate={{latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0}}></Marker>
        {circles.map(el => <Circle key={++id} center={{latitude: el.latitude, longitude: el.longitude}} radius={el.radius} fillColor={el.color} strokeColor="rgba(0, 0, 0, 0)"/>)}
      </MapView>
      <View style={{zIndex: 100, position: 'absolute', bottom: 24, width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)", display: 'flex', flexDirection: 'row',
        justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Ionicons name="ios-add-circle" color="white" size={64}/>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide" presentationStyle="formSheet">
        <View style={{height: '100%', width: '100%', padding: 20}}>
          <Text style={{fontSize: 36}}>Setting Up Geofence</Text>
          <Text style={{fontSize: 18, marginTop: 20}}>A geofence will be set up centered at your current location.</Text>
          <Text style={{fontSize: 18, marginTop: 10}}>Please choose whether it will be a white list or a black list:</Text>
          <Picker style={{height: 100, bottom: 50}} selectedValue={list} onValueChange={itemValue => setList(itemValue)}>
            <Picker.Item label="White List" value="White List" color="white"/>
            <Picker.Item label="Black List" value="Black List" color="white"/>
          </Picker>
          <Text style={{fontSize: 18, marginTop: 10}}>Please enter the desired radius:</Text>
          <TextInput style={{color: 'white', height: 50, width: '100%', fontSize: 24, borderWidth: 1,
            borderColor: '#696969', borderRadius: 10, padding: 10, marginTop: 10}}
            keyboardType="number-pad" onChangeText={text => setTempVal(text)} autoFocus={true}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => setShowModal(false)}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 10}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => {
                setShowModal(false);
                setCircles(circles.concat([{
                  latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0,
                  radius: parseInt(tempVal) || 100, color: list == 'Black List' ? 'rgba(256, 0, 0, 0.1)' : 'rgba(0, 256, 0, 0.1)'}]))
              }}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 10}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}