
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";
import Login from "../screens/login";
import GroupInfo from "../screens/GroupInfo";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Login">
        <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AppStack.Screen name="ProductList" component={ProductList} />
        <AppStack.Screen name="ProductDetail" component={ProductDetail} />
        <AppStack.Screen name="GroupInfo" component={GroupInfo} options={{ title: "Informações do Grupo" }} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}