import { dayType, timeListType, timeListEntryType } from '../types'


export function processTimeList(timeList: timeListType, setTimeList: (list: timeListType) => void) {
    const now = new Date();
    let removes: number[] = []
    const times: {[index: number]: number} = {};
    const list = [...timeList];
    list.forEach((el: timeListEntryType) => {
        const dayMap: {[K in dayType]: number} = {Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7};
        let day = (dayMap[el[1]] - now.getDay() + 7) % 7;
        if (day == 0 && (el[4] < now.getHours() || (el[4] == now.getHours() && el[5] <= now.getMinutes())))
            day = 7;
        if (day == 7 && (el[0] == 'Temp Black List' || el[0] == 'Temp White List'))
            removes.push(el[6]);
        times[el[6]] = day;
    });
    list.sort((a: timeListEntryType, b: timeListEntryType) => {
        const aDay = times[a[6]];
        const bDay = times[b[6]];
        if (aDay < bDay)
            return -1;
        if (aDay > bDay)
            return 1;
        if (a[4] < b[4])
            return -1;
        if (a[4] > b[4])
            return 1;
        if (a[5] < b[5])
            return -1;
        if (a[5] > b[5])
            return 1;
        return 0;
    });
    const filteredList = list.filter(el => removes.indexOf(el[6]) == -1);
    if (JSON.stringify(filteredList) !== JSON.stringify(timeList))
        setTimeList(filteredList);
}


export function pad(thing: number) {
    return ('' + thing).padStart(2, '0');
}