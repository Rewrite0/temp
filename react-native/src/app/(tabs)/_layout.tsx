import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-paper';
import { MaterialBottomTabs as Tabs } from '@/components/ui';

type Route = {
  name: string;
  title: string;
  icon: string;
  badge?: number;
};

export default function Layout() {
  const { t } = useTranslation();

  const routes: Route[] = [
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
    <Tabs>
      {routes.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            tabBarIcon: (props: any) => <Icon source={route.icon} size={24} {...props} />,
            tabBarBadge: route.badge,
          }}
        />
      ))}
    </Tabs>
  );
}
