import Constants from 'expo-constants';
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const categories = [
  { key: 'all', label: 'Tümü' },
  { key: 'herbal', label: 'Bitkisel' },
  { key: 'methods', label: 'Yöntemler' },
  { key: 'saved', label: 'Kaydedilenler' },
];

const popularFilters = [
  'Tümü',
  'Soğuk Algınlığı',
  'Sindirim',
  'Uyku',
  'Stres',
  'Cilt',
  'Bağışıklık',
];

const herbalTreatments = [
  {
    title: 'Zencefil Çayı',
    desc: 'Soğuk algınlığı ve sindirim sorunları için',
    rating: 128,
    tags: ['Bitkisel', 'Kolay'],
    color: '#e6fff2',
    icon: '📖',
  },
  {
    title: 'Lavanta Yağı',
    desc: 'Stres ve uyku sorunları için',
    rating: 95,
    tags: ['Aromaterapi'],
    color: '#e6f0ff',
    icon: '🧴',
  },
  {
    title: 'Aloe Vera Jeli',
    desc: 'Cilt sorunları ve yanıklar için',
    rating: 76,
    tags: ['Bitkisel', 'Cilt'],
    color: '#f3e6ff',
    icon: '🧴',
  },
];

const altMethods = [
  {
    title: 'Akupunktur',
    desc: 'Ağrı yönetimi ve stres azaltma için',
    rating: 112,
    tags: ['Uzman'],
    color: '#fff7e6',
    icon: '⚡',
  },
  {
    title: 'Meditasyon',
    desc: 'Stres azaltma ve zihinsel sağlık için',
    rating: 89,
    tags: ['Kolay'],
    color: '#e6f0ff',
    icon: '😊',
  },
  {
    title: 'Yoga',
    desc: 'Esneklik ve zihin-beden dengesi için',
    rating: 103,
    tags: ['Orta'],
    color: '#ffe6e6',
    icon: '🧘',
  },
];

const TreatmentsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Tümü');

  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight + 10 }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}><Text style={styles.logoIconText}>+</Text></View>
          <View>
            <Text style={styles.logoTitle}>Tedaviler</Text>
            <Text style={styles.logoDesc}>Doğal Şifa Yöntemleri</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Text style={styles.headerIcon}>🔍</Text>
          <Text style={styles.headerIcon}>⚙️</Text>
        </View>
      </View>
      {/* Category Tabs */}
      <View style={styles.tabsRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.tabItem, selectedCategory === cat.key && styles.tabItemActive]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text style={[styles.tabText, selectedCategory === cat.key && styles.tabTextActive]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tedavi ara..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Popular Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {popularFilters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterBtn, selectedFilter === filter && styles.filterBtnActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Herbal Treatments */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Bitkisel Tedaviler</Text>
        <Text style={styles.sectionLink}>Tümünü Gör</Text>
      </View>
      {herbalTreatments.map((item, idx) => (
        <View key={idx} style={[styles.treatmentCard, {backgroundColor: item.color}]}> 
          <Text style={styles.treatmentIcon}>{item.icon}</Text>
          <View style={{flex:1}}>
            <Text style={styles.treatmentTitle}>{item.title}</Text>
            <Text style={styles.treatmentDesc}>{item.desc}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingText}>{item.rating}</Text>
              {item.tags.map((tag, i) => (
                <Text key={i} style={styles.tag}>{tag}</Text>
              ))}
            </View>
          </View>
          <Text style={styles.heart}>♡</Text>
        </View>
      ))}
      {/* Alternative Methods */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Alternatif Yöntemler</Text>
        <Text style={styles.sectionLink}>Tümünü Gör</Text>
      </View>
      {altMethods.map((item, idx) => (
        <View key={idx} style={[styles.treatmentCard, {backgroundColor: item.color}]}> 
          <Text style={styles.treatmentIcon}>{item.icon}</Text>
          <View style={{flex:1}}>
            <Text style={styles.treatmentTitle}>{item.title}</Text>
            <Text style={styles.treatmentDesc}>{item.desc}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingText}>{item.rating}</Text>
              {item.tags.map((tag, i) => (
                <Text key={i} style={styles.tag}>{tag}</Text>
              ))}
            </View>
          </View>
          <Text style={styles.heart}>♡</Text>
        </View>
      ))}
      <View style={{height: 80}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#4CAF50' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { backgroundColor: '#E8F5E9', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoIconText: { color: '#4CAF50', fontSize: 24, fontWeight: 'bold' },
  logoTitle: { fontWeight: 'bold', fontSize: 18, color: '#fff' },
  logoDesc: { fontSize: 13, color: '#fff', opacity: 0.8 },
  headerIcons: { flexDirection: 'row' },
  headerIcon: { fontSize: 22, marginLeft: 16, color: '#fff' },
  tabsRow: { flexDirection: 'row', marginHorizontal: 8, marginBottom: 8 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderColor: 'transparent', marginHorizontal: 4 },
  tabItemActive: { borderColor: '#4CAF50' },
  tabText: { color: '#666666', fontWeight: 'bold' },
  tabTextActive: { color: '#4CAF50' },
  searchBox: { marginHorizontal: 16, marginVertical: 8 },
  searchInput: { backgroundColor: '#fff', borderRadius: 16, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  filterRow: { marginLeft: 8, marginBottom: 8 },
  filterBtn: { backgroundColor: '#f8f9fa', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18, marginRight: 8, borderWidth: 1, borderColor: '#E0E0E0' },
  filterBtnActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  filterText: { color: '#666666', fontWeight: 'bold' },
  filterTextActive: { color: '#fff' },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18 },
  sectionLink: { color: '#4CAF50', fontWeight: 'bold' },
  treatmentCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, marginHorizontal: 16, marginTop: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 },
  treatmentIcon: { fontSize: 32, marginRight: 16 },
  treatmentTitle: { fontWeight: 'bold', fontSize: 16 },
  treatmentDesc: { color: '#666666', fontSize: 13, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingStar: { color: '#FFD700', marginRight: 2 },
  ratingText: { color: '#666666', marginRight: 8, fontWeight: 'bold' },
  tag: { backgroundColor: '#E8F5E9', color: '#4CAF50', borderRadius: 8, paddingHorizontal: 8, marginRight: 4, fontSize: 12 },
  heart: { fontSize: 22, color: '#E0E0E0', marginLeft: 8 },
});

export default TreatmentsPage; 