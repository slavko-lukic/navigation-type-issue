import {
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["https://myapp.com", "myapp://"],
  config: {
    screens: {
      tabs: {
        /**
         * Here is where type is inferred incorrectly if enum is used.
         * Screens is omitted.
         */
        screens: {},
      },
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootStack />
    </NavigationContainer>
  );
}

// NAVIGATION

enum Routes {
  TABS = "tabs",
  ABOUT = "about",
  HOME = "home",
  CONTACT = "contact",
}

type RootStackParamList = {
  [Routes.TABS]: NavigatorScreenParams<TabParamList>;
  [Routes.ABOUT]: undefined;
};

/**
 * Type that gives error.
 * Comment this type and uncomment the one under it to see error scenario.
 */
type TabParamList = {
  [Routes.HOME]: undefined;
  [Routes.CONTACT]: undefined;
};

/**
 * Type that works.
 * Comment this type and uncomment the one above it to see working scenario.
 */
// type TabParamList = {
//   home: undefined;
//   contact: undefined;
// };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.TABS} component={MyTabs} />
      <Stack.Screen name={Routes.ABOUT} component={AboutScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      <Tab.Screen name={Routes.CONTACT} component={ContactScreen} />
    </Tab.Navigator>
  );
}

// SCREENS

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
