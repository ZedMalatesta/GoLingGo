import React, { FC } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { bodyFont, colors } from '../constants/colors';
import CalendarPage from '../pages/CalendarPage';
import CreateEventPage from '../pages/CreateEventPage';
import EventsPage from '../pages/EventsPage';
import MyEventsPage from '../pages/MyEventsPage';
import ProfilePage from '../pages/ProfilePage';

export type RootTabParamList = {
  Events: undefined;
  Calendar: undefined;
  Create: undefined;
  MyEvents: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> =
  {
    Events: 'compass',
    Calendar: 'calendar',
    Create: 'add-circle',
    MyEvents: 'ticket',
    Profile: 'person',
  };

const tabTitleKeys: Record<keyof RootTabParamList, string> = {
  Events: 'tabs.events',
  Calendar: 'tabs.calendar',
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
          tabBarLabelStyle: {
            fontFamily: bodyFont.bold,
            fontSize: 11,
            fontWeight: '600',
          },
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: colors.background,
            shadowColor: '#16295c',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 12,
          },
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
        <Tab.Screen name="Calendar" component={CalendarPage} />
        <Tab.Screen name="Create" component={CreateEventPage} />
        <Tab.Screen name="MyEvents" component={MyEventsPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
