import React, { FC } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { colors } from '../constants/colors';
import CreateEventPage from '../pages/CreateEventPage';
import EventsPage from '../pages/EventsPage';
import MyEventsPage from '../pages/MyEventsPage';
import ProfilePage from '../pages/ProfilePage';

export type RootTabParamList = {
  Events: undefined;
  Create: undefined;
  MyEvents: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> =
  {
    Events: 'compass',
    Create: 'add-circle',
    MyEvents: 'calendar',
    Profile: 'person',
  };

const tabTitleKeys: Record<keyof RootTabParamList, string> = {
  Events: 'tabs.events',
  Create: 'tabs.create',
  MyEvents: 'tabs.myEvents',
  Profile: 'tabs.profile',
};

const Routes: FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          title: t(tabTitleKeys[route.name as keyof RootTabParamList]),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={tabIcons[route.name as keyof RootTabParamList]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Events" component={EventsPage} />
        <Tab.Screen name="Create" component={CreateEventPage} />
        <Tab.Screen name="MyEvents" component={MyEventsPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
