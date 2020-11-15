export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
};

export type typeList = 'White List' | 'Temp White List' | 'Less White List' | 'Black List' | 'Temp Black List' | 'Less Black List';
export type dayType = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type timeListEntryType = [typeList, dayType, number, number, number, number, number];
export type timeListType = timeListEntryType[];