import { Tabs } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { BrandColors, BrandFonts } from "@/constants/Theme";

/**
 * Tab icon component — uses text emoji for now.
 * Will be replaced with proper icon assets later.
 */
function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View style={tabStyles.iconContainer}>
      <Text
        style={[
          tabStyles.icon,
          { opacity: focused ? 1 : 0.4 },
        ]}
      >
        {icon}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.tabBar,
        tabBarActiveTintColor: BrandColors.ink,
        tabBarInactiveTintColor: BrandColors.stone,
        tabBarLabelStyle: tabStyles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wardrobe"
        options={{
          title: "Wardrobe",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👔" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🔍" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: BrandColors.white,
    borderTopWidth: 1,
    borderTopColor: BrandColors.linen,
    height: 80,
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: BrandFonts.sansMedium,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
  },
});
