// Bottom tabs (Home, New Inspection, Records) with a stack inside each tab. Member 3 owns this file.
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { HomeStackParamList, NewStackParamList, RecordsStackParamList, RootTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { NewInspectionScreen } from '../screens/NewInspectionScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { RecordsScreen } from '../screens/RecordsScreen';
import { InspectionDetailsScreen } from '../screens/InspectionDetailsScreen';
import { Dock } from '../components/Dock';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const NewStack = createNativeStackNavigator<NewStackParamList>();
const RecordsStack = createNativeStackNavigator<RecordsStackParamList>();

// Every screen draws its own Header (with the group code), so the native header is off.
const stackOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.bg },
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={stackOptions}>
      <HomeStack.Screen name="Catalog" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function NewStackScreen() {
  return (
    <NewStack.Navigator screenOptions={stackOptions}>
      <NewStack.Screen name="Form" component={NewInspectionScreen} />
      <NewStack.Screen name="Review" component={ReviewScreen} />
    </NewStack.Navigator>
  );
}

function RecordsStackScreen() {
  return (
    <RecordsStack.Navigator screenOptions={stackOptions}>
      <RecordsStack.Screen name="RecordsList" component={RecordsScreen} />
      <RecordsStack.Screen name="InspectionDetails" component={InspectionDetailsScreen} />
    </RecordsStack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <Dock {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="NewTab" component={NewStackScreen} options={{ title: 'New Inspection' }} />
      <Tab.Screen name="RecordsTab" component={RecordsStackScreen} options={{ title: 'Records' }} />
    </Tab.Navigator>
  );
}
