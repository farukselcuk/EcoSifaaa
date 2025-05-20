import { useRouter, useSegments } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const tabs = [
  { name: 'Anasayfa', route: '/', icon: '🏠' },
  { name: 'Tedaviler', route: '/(tabs)/explore', icon: '📚' },
  { name: 'Öneri Al', route: '/(tabs)/suggestion', icon: '📝' },
  { name: 'Profil', route: '/(tabs)/profile', icon: '👤' },
];

const BottomNavBar = () => {
  const router = useRouter();
  const segments = useSegments();
  const current = segments[segments.length - 1];

  return (
    <View style={styles.bar}>
      {tabs.map((tab, idx) => {
        const isActive = (
          (tab.route === '/' && (current === 'index' || current === undefined)) ||
          (tab.route === '/(tabs)/explore' && current === 'explore') ||
          (tab.route === '/(tabs)/suggestion' && current === 'suggestion') ||
          (tab.route === '/(tabs)/profile' && current === 'profile')
        );
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => tab.route !== '#' && router.replace(tab.route)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    height: 60,
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
    zIndex: 100,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderRadius: 20,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  icon: {
    fontSize: 22,
    color: '#888',
  },
  iconActive: {
    color: '#00c97b',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  labelActive: {
    color: '#00c97b',
    fontWeight: 'bold',
  },
});

export default BottomNavBar; 