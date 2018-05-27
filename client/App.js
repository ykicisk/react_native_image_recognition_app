import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainScreen from './src/components/Main';
import ResultScreen from './src/components/Result';



const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Result: {
      screen: ResultScreen,
    },
  },
  {
    initialRouteName: 'Main',
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
