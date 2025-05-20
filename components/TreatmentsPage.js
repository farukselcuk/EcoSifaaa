import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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

  return (
    <ScrollView style={styles.container}>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { backgroundColor: '#e6fff2', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoIconText: { color: '#00c97b', fontSize: 24, fontWeight: 'bold' },
  logoTitle: { fontWeight: 'bold', fontSize: 18 },
  logoDesc: { fontSize: 13, color: '#888' },
  headerIcons: { flexDirection: 'row' },
  headerIcon: { fontSize: 22, marginLeft: 16 },
  tabsRow: { flexDirection: 'row', marginHorizontal: 8, marginBottom: 8 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderColor: 'transparent' },
  tabItemActive: { borderColor: '#00c97b', backgroundColor: '#e6fff2', borderRadius: 10 },
  tabText: { color: '#888', fontWeight: 'bold' },
  tabTextActive: { color: '#00c97b' },
  searchBox: { marginHorizontal: 16, marginVertical: 8 },
  searchInput: { backgroundColor: '#fff', borderRadius: 16, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#eee' },
  filterRow: { marginLeft: 8, marginBottom: 8 },
  filterBtn: { backgroundColor: '#f1f3f6', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18, marginRight: 8 },
  filterBtnActive: { backgroundColor: '#00c97b' },
  filterText: { color: '#888', fontWeight: 'bold' },
  filterTextActive: { color: '#fff' },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18 },
  sectionLink: { color: '#00c97b', fontWeight: 'bold' },
  treatmentCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, marginHorizontal: 16, marginTop: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 },
  treatmentIcon: { fontSize: 32, marginRight: 16 },
  treatmentTitle: { fontWeight: 'bold', fontSize: 16 },
  treatmentDesc: { color: '#888', fontSize: 13, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingStar: { color: '#FFD700', marginRight: 2 },
  ratingText: { color: '#888', marginRight: 8, fontWeight: 'bold' },
  tag: { backgroundColor: '#e6fff2', color: '#00c97b', borderRadius: 8, paddingHorizontal: 8, marginRight: 4, fontSize: 12 },
  heart: { fontSize: 22, color: '#ccc', marginLeft: 8 },
});

export default TreatmentsPage; 