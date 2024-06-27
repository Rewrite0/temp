/** https://github.com/i18next/react-i18next/issues/1495#issuecomment-1113990587 */
import 'intl-pluralrules';
import '~/i18n';

import { StatusBar } from 'expo-status-bar';
import { PaperProvider, BottomNavigation, Icon } from 'react-native-paper';
import { Tabs } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import { usePaperTheme } from '~/hooks/usePaperTheme';

export default function RootLayout() {
  const paperTheme = usePaperTheme();
  const { t } = useTranslation();

  const routes = [
    {
      name: 'index',
      title: t('tabs.home'),
      icon: 'home',
    },
    {
      name: 'about',
      title: t('tabs.about'),
      icon: 'account',
    },
  ];

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: paperTheme.colors.primaryContainer,
          },
          headerTintColor: paperTheme.colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        tabBar={renderMaterial3TabBar}
      >
        {routes.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.title,
              tabBarIcon: (props) => <Icon source={route.icon} {...props} />,
            }}
          />
        ))}
      </Tabs>
    </PaperProvider>
  );
}

function renderMaterial3TabBar({ navigation, state, descriptors, insets }: BottomTabBarProps) {
  const ignoreRoutes = ['_sitemap', '+not-found'];
  const newState = {
    ...state,
    routeNames: state.routeNames.filter((routeName) => !ignoreRoutes.includes(routeName)),
    routes: state.routes.filter((route) => !ignoreRoutes.includes(route.name)),
  };

  return (
    <BottomNavigation.Bar
      navigationState={newState}
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
        const label = options?.title ?? route.name;

        return label;
      }}
    />
  );
}
