import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './Navigation/bottomNavigation'

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
