/**
 * React Native App for displaying todos from a JSON file.
-----------------------------------------------------------------------
 * Made by : Boyan Krastenyakov // 11.08.2021
 */

import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Todos from './src/todos-list';
import UrgentTodos from './src/todo-urgents';

function TodosList() {
  return (
    <View style={{ flex: 1 }}>
      <Todos/>
    </View>
  );
}
function UrgentTodosList() {
  return (
    <View style={{ flex: 1 }}>
      <UrgentTodos/>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator 
          initialRouteName="All Todos" 
          screenOptions={{
            headerShown: false
          }}
        >
          <Tab.Screen name="All Todos" component={TodosList} />
          <Tab.Screen name="Urgents" component={UrgentTodosList} />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

