import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Modal, TouchableOpacity, TextInput } from 'react-native';

import { Calendar } from 'react-native-calendars';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';
import { pad } from '../core/util';

let dotIdx = 0;
export default function TabTwoScreen() {
  const [showForm, setShowForm] = React.useState(0);
  const [totalCal, setTotalCal] = React.useState(0);
  const [currCal, setCurrCal] = React.useState(0);
  const [tempVal, setTempVal] = React.useState('');
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date().getTime());
  const [now, setNow] = React.useState(new Date());
  const dot1 = {key: 'hardWorkout', color: '#00FF7F'}
  const dot2 = {key: 'mediWorkout', color: '#98FB98'}
  const dot3 = {key: 'softWorkout', color: '#8FBC8F'}
  const [dots, setDots] = React.useState<{key: string, color: string}[]>([]);
  const addDots = function addDots(numCal: number) {
    let color;
    if (numCal < 100)
      color = '#8FBC8F';
    else if (numCal < 200)
      color = '#98FB98';
    else
      color = '#00FF7F';
    const obj = {key: ('' + ++dotIdx), color};
    setDots(dots.concat([obj]));
  }
  const width = 360 * (((now.getTime() - startTime) / (15 * 60000)) || 0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <View style={{flex: 1}}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 20}}>
        <TouchableWithoutFeedback onPress={() => setShowForm(3)}>
          <Text style={{fontSize: 32}}>Your Goal: </Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => setShowForm(2)}>
          <Text style={{fontSize: 32}}>{currCal}/{totalCal}</Text>
        </TouchableOpacity>
      </View>
      <Calendar theme={{
        calendarBackground: '#000000',
        dayTextColor: '#d9e1e8',
        textDisabledColor: '#2d4150',
      }} markedDates={{
        '2020-11-01': {dots: [dot1, dot2, dot3]},
        '2020-11-04': {dots: [dot3]},
        '2020-11-06': {dots: [dot3, dot2]},
        '2020-11-07': {dots: [dot3, dot1, dot2]},
        '2020-11-08': {dots: [dot2, dot3]},
        '2020-11-10': {dots: [dot3]},
        '2020-11-12': {dots: [dot3]},
        '2020-11-14': {dots: [dot3, dot2]},
        '2020-11-15': {dots},
      }} markingType="multi-dot"></Calendar>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: "100%", marginTop: 200}}>
        <TouchableOpacity onPress={() => {setShowForm(1)}}>
          <Ionicons size={64} name="ios-add-circle" color="white"/>
        </TouchableOpacity>
      </View>
      <Modal visible={showForm == 1} animationType="slide" presentationStyle="formSheet">
        <View style={{height: '100%', width: '100%', padding: 20}}>
          <Text style={{fontSize: 36}}>Congratulations on finishing a workout!</Text>
          <Text style={{fontSize: 24, marginTop: 40}}>Please enter the amount of calories burned:</Text>
          <TextInput style={{color: 'white', height: 50, width: '100%', fontSize: 24, borderWidth: 1,
            borderColor: '#696969', borderRadius: 10, padding: 10, marginTop: 10}}
            keyboardType="number-pad" onChangeText={text => setTempVal(text)} autoFocus={true}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => setShowForm(0)}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 30}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => {setShowForm(0);setCurrCal(currCal + (parseInt(tempVal) || 0));addDots(parseInt(tempVal) || 0)}}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 30}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showForm == 2} animationType="slide" presentationStyle="formSheet">
        <View style={{height: '100%', width: '100%', padding: 20}}>
          <Text style={{fontSize: 36}}>Goal Setting</Text>
          <Text style={{fontSize: 24, marginTop: 40}}>Please enter the amount of calories you are trying to burn each month:</Text>
          <TextInput style={{color: 'white', height: 50, width: '100%', fontSize: 24, borderWidth: 1,
            borderColor: '#696969', borderRadius: 10, padding: 10, marginTop: 10}}
            keyboardType="number-pad" onChangeText={text => setTempVal(text)} autoFocus={true}/>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => setShowForm(0)}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 30}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => {setShowForm(0);setTotalCal(parseInt(tempVal) || totalCal)}}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 30}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showForm == 3} animationType="slide" presentationStyle="formSheet">
        <View style={{height: '100%', width: '100%', padding: 20}}>
          <Text style={{fontSize: 36}}>Starting a Workout</Text>
          <Text style={{fontSize: 24, marginTop: 40}}>It is time to start a workout!</Text>
          <Text style={{fontSize: 24, marginTop: 10}}>This workout session will last 15 minutes, from {pad(new Date().getHours())}:{pad(new Date().getMinutes())} to {pad(new Date(new Date().getTime() + 15 * 60000).getHours())}:{pad(new Date(new Date().getTime() + 15 * 60000).getMinutes())}.</Text>
          <Text style={{fontSize: 24, marginTop: 10}}>Please confirm that you are available within that time period:</Text>
          <View style={{display: showProgressBar ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => setShowForm(0)}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 30}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
              onPress={() => {setShowProgressBar(true);setStartTime(new Date().getTime())}}>
              <Text style={{fontSize: 24, color: '#007AFF', marginTop: 30}}>Confirm</Text>
            </TouchableOpacity>
          </View>
          <View style={{display: showProgressBar ? 'flex' : 'none', height: 80, width: '100%', top: 100, borderRadius: 10, borderWidth: 1, borderColor: '#696969', overflow: 'hidden'}}>
            <View style={{position: 'absolute', width, height: 78, backgroundColor: '#98FB98', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}></View>
            <View style={{width: "100%", backgroundColor: 'rgba(0, 0, 0, 0)', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 78, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                <TouchableOpacity onPress={() => {setShowForm(1);setShowProgressBar(false)}}>
                  <Text style={{fontSize: 24, color: '#fb9898'}}>15 minutes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}