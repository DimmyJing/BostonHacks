import * as React from 'react';
import { TouchableOpacity, Picker, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { processTimeList, pad } from '../core/util';
import { Text, View } from '../components/Themed';
import { dayType, typeList, timeListType } from '../types';
import TimeEntry from '../components/TimeEntry';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

let id = 0;
export default function TabOneScreen() {
  const [showPicker, setShowPicker] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState<typeList>('White List');
  const [inputStartTime, setInputStartTime] = React.useState(new Date());
  const [inputEndTime, setInputEndTime] = React.useState(new Date());
  const [dayOfWeek, setDayOfWeek] = React.useState<dayType>(
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(new Date().getDay() + 6) % 7] as dayType);
  const [timeList, setTimeList] = React.useState<timeListType>([]);
  const fontSize = 18;
  const bottom = 100;

  React.useEffect(() => {
    const interval = setInterval(() => {
      processTimeList(timeList, setTimeList);
    }, 1000);
    return () => clearInterval(interval);
  })

  const removeEntry = function removeEntry(idx: number) {
    const list = timeList.filter(el => el[6] !== idx);
    setTimeList(list);
  }

  processTimeList(timeList, setTimeList);
  return (
    <View style={{flex: 1}}>
      <View style={{display: "flex", flexDirection: "row", margin: 5, borderWidth: 1, borderColor: '#696969', padding: 5, borderRadius: 10, paddingTop: 10, marginTop: 20}}>
        <View style={{borderLeftWidth: 1, borderLeftColor: '#696969', position: 'absolute', height: 42, left: 140}}/>
        <View style={{borderLeftWidth: 1, borderLeftColor: '#696969', position: 'absolute', height: 42, left: 197}}/>
        <View style={{borderLeftWidth: 1, borderLeftColor: '#696969', position: 'absolute', height: 42, left: 320}}/>
        <TouchableOpacity onPress={() => setShowPicker(3)}>
          <Text style={{width: 145, fontSize}}>{selectedType}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker(4)}>
          <Text style={{fontSize, marginRight: 10, width: 44}}>{dayOfWeek}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker(1)}>
          <Text style={{fontSize, width: 49}}>{pad(inputStartTime.getHours()) + ':' + pad(inputStartTime.getMinutes())}</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => setShowPicker(0)}>
          <Text style={{fontSize}}> - </Text>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => setShowPicker(2)}>
          <Text style={{fontSize, width: 47}}>{pad(inputEndTime.getHours()) + ':' + pad(inputEndTime.getMinutes())}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setShowPicker(0); setTimeList(timeList.concat([[
          selectedType, dayOfWeek, inputStartTime.getHours(), inputStartTime.getMinutes(), inputEndTime.getHours(), inputEndTime.getMinutes(), ++id]]))}}>
          <Ionicons style={{marginLeft: 13, top: -3}} size={28} name="ios-add-circle" color="white"/>
        </TouchableOpacity>
      </View>
      <View>
        {timeList.map(el => <TimeEntry key={el[6]} data={el} removeEntry={removeEntry}/>)}
      </View>
        <DateTimePicker
          style={{display: (showPicker == 1 || showPicker == 2) ? 'flex' : 'none', width: '100%', position: 'absolute', bottom, backgroundColor: 'black'}}
          testID="dateTimePicker"
          value={showPicker == 1 ? inputStartTime : inputEndTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || (showPicker == 1 ? inputStartTime : inputEndTime);
            showPicker == 1 ? setInputStartTime(currentDate) : setInputEndTime(currentDate);
          }}/>
      {showPicker == 3 && (
        <Picker style={{width: Dimensions.get('window').width, position: 'absolute', bottom, backgroundColor: 'black'}}
          selectedValue={selectedType} onValueChange={(itemValue) => setSelectedType(itemValue)}>
          <Picker.Item label="White List" value="White List" color="white"/>
          <Picker.Item label="Temp White List" value="Temp White List" color="white"/>
          <Picker.Item label="Less White List" value="Less White List" color="white"/>
          <Picker.Item label="Black List" value="Black List" color="white"/>
          <Picker.Item label="Temp Black List" value="Temp Black List" color="white"/>
          <Picker.Item label="Less Black List" value="Less Black List" color="white"/>
        </Picker>
      )}
      {showPicker == 4 && (
        <Picker style={{width: Dimensions.get('window').width, position: 'absolute', bottom, backgroundColor: 'black'}}
          selectedValue={dayOfWeek} onValueChange={(itemValue) => setDayOfWeek(itemValue)}>
          <Picker.Item label="Mon" value="Mon" color="white"/>
          <Picker.Item label="Tue" value="Tue" color="white"/>
          <Picker.Item label="Wed" value="Wed" color="white"/>
          <Picker.Item label="Thu" value="Thu" color="white"/>
          <Picker.Item label="Fri" value="Fri" color="white"/>
          <Picker.Item label="Sat" value="Sat" color="white"/>
          <Picker.Item label="Sun" value="Sun" color="white"/>
        </Picker>
      )}
    </View>
  );
}