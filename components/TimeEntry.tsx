import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pad } from '../core/util';
import { timeListEntryType, timeListType, typeList } from '../types';


import { View, Text } from './Themed';


export default function TimeEntry(props: {data: timeListEntryType, removeEntry: (idx: number) => void}) {
    const { data, removeEntry } = props;
    const [now, setNow] = React.useState(new Date());
    const fontSize = 20;
    React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    });
    const colors: {[K in typeList]: string} = {
        "Black List": "#FF2400",
        "Temp Black List": "#FF69B4",
        "Less Black List": "#FA8072",
        "White List": "#7fff00",
        "Temp White List": "#b2ec5d",
        "Less White List": "#a7fc00",
    }
    let backgroundColor = colors[data[0]];
    const totalTime = ((data[4] - data[2]) * 360 + (data[5] - data[3]) * 60) || 1;
    let spentTime = (now.getHours() - data[2]) * 360 + (now.getMinutes() - data[3]) * 60 + now.getSeconds();
    if (spentTime >= totalTime || spentTime <= 0) {
        backgroundColor = 'rgba(0, 0, 0, 0)';
        spentTime = totalTime;
    }
    const width = 363 * (spentTime / totalTime);
    return (
        <View style={{display: 'flex', flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: "#696969", borderRadius: 10, padding: 5, paddingTop: 8, overflow: 'hidden'}}>
            <View style={{position: 'absolute', width, backgroundColor, height: 43, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}></View>
            <Text style={{fontSize, width: 155}}>{data[0]}    </Text>
            <Text style={{fontSize, width: 170}}>{`${data[1]} ${pad(data[2])}:${pad(data[3])} - ${pad(data[4])}:${pad(data[5])}`}</Text>
            <TouchableOpacity style={{right: 9, bottom: 2}} onPress={() => removeEntry(data[6])}>
                <Ionicons size={30} name="ios-close-circle" color="white"/>
            </TouchableOpacity>
        </View>
    )
}