import { Tabs } from 'expo-router';
import { CommonActions } from '@react-navigation/core';
import { PropsWithChildren } from 'react';
import { BottomNavigation, BottomNavigationProps } from 'react-native-paper';
import { View } from 'react-native';
import { usePaperTheme } from '@/modules/system-ui/paper-theme';

export type MaterialBottomTabsProps = PropsWithChildren<
  Omit<
    BottomNavigationProps<any>,
    | 'navigationState'
    | 'safeAreaInsets'
    | 'onTabPress'
    | 'renderIcon'
    | 'getLabelText'
    | 'onIndexChange'
    | 'renderScene'
  >
>;

export function MaterialBottomTabs({ children, ...props }: MaterialBottomTabsProps) {
  const { paperTheme } = usePaperTheme();

  return (
    <Tabs
      screenLayout={({ children }) => (
        <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>{children}</View>
      )}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          {...props}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : 'title' in route
                ? route.title
                : route.name;

            return String(label);
          }}
          getBadge={({ route }) => descriptors[route.key].options.tabBarBadge}
        />
      )}
    >
      {children}
    </Tabs>
  );
}

MaterialBottomTabs.Screen = Tabs.Screen;
