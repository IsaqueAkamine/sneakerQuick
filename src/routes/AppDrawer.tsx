import { createDrawerNavigator } from '@react-navigation/drawer';
import { Products } from '../screens';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Products" component={Products} />
    </Drawer.Navigator>
  );
}
