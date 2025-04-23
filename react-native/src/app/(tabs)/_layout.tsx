import { Tabs, withLayoutContext } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const MaterialTabs = withLayoutContext(createMaterialBottomTabNavigator().Navigator);
MaterialTabs.Screen = Tabs.Screen;

export default function Layout() {
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
    <MaterialTabs>
      {routes.map((route) => (
        <MaterialTabs.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            tabBarIcon: (props: any) => <Icon source={route.icon} size={24} {...props} />,
          }}
        />
      ))}
    </MaterialTabs>
  );
}
