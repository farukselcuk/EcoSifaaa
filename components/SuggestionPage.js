import Constants from 'expo-constants';
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const complaints = [
  { label: 'Baş Ağrısı', color: '#ffe6e6', icon: '⏰' },
  { label: 'Stres', color: '#e6f0ff', icon: '❌' },
  { label: 'Bağışıklık', color: '#fff7e6', icon: '🛡️' },
  { label: 'Sindirim', color: '#e6fff2', icon: '✋' },
  { label: 'Cilt', color: '#f3e6ff', icon: '🎫' },
  { label: 'Uyku', color: '#e6e6ff', icon: '🌙' },
];

const popularComplaints = [
  { label: 'Soğuk Algınlığı', color: '#fff7e6', icon: '⚠️' },
  { label: 'Yorgunluk', color: '#ffe6f0', icon: '💗' },
  { label: 'Boğaz Ağrısı', color: '#e6faff', icon: '🎤' },
];

const SuggestionPage = () => {
  const [selected, setSelected] = useState([]);
  const toggleSelect = (label) => {
    setSelected((prev) => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight + 10 }]} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}><Text style={styles.logoIconText}>🗓️</Text></View>
          <View>
            <Text style={styles.logoTitle}>Öneri Al</Text>
            <Text style={styles.logoDesc}>Kişiselleştirilmiş Tedavi Önerileri</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Text style={styles.headerIcon}>⚙️</Text>
        </View>
      </View>
      {/* Soru */}
      <Text style={styles.questionTitle}>Şikayetiniz nedir?</Text>
      <Text style={styles.questionDesc}>Size en uygun tedavi önerilerini sunabilmemiz için şikayetlerinizi seçin.</Text>
      {/* Arama */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Şikayet ara..."
        />
      </View>
      {/* Şikayetler */}
      <View style={styles.complaintsGrid}>
        {complaints.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.complaintCard, { backgroundColor: item.color, borderWidth: selected.includes(item.label) ? 2 : 0, borderColor: '#00c97b' }]}
            onPress={() => toggleSelect(item.label)}
            activeOpacity={0.7}
          >
            <Text style={styles.complaintIcon}>{item.icon}</Text>
            <Text style={styles.complaintLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Popüler Şikayetler */}
      <Text style={styles.popularTitle}>Popüler Şikayetler</Text>
      <View style={styles.popularList}>
        {popularComplaints.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.popularCard, { backgroundColor: item.color, borderWidth: selected.includes(item.label) ? 2 : 0, borderColor: '#00c97b' }]}
            onPress={() => toggleSelect(item.label)}
            activeOpacity={0.7}
          >
            <Text style={styles.popularIcon}>{item.icon}</Text>
            <Text style={styles.popularLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Devam Et Butonu */}
      <TouchableOpacity style={styles.continueBtn} disabled={selected.length === 0}>
        <Text style={styles.continueBtnText}>Devam Et</Text>
      </TouchableOpacity>
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
  questionTitle: { fontWeight: 'bold', fontSize: 18, marginHorizontal: 16, marginTop: 8 },
  questionDesc: { color: '#666666', marginHorizontal: 16, marginBottom: 8 },
  searchBox: { marginHorizontal: 16, marginVertical: 8 },
  searchInput: { backgroundColor: '#fff', borderRadius: 16, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  complaintsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 8 },
  complaintCard: { width: '30%', aspectRatio: 1, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  complaintIcon: { fontSize: 28, marginBottom: 6 },
  complaintLabel: { fontWeight: 'bold', fontSize: 14, textAlign: 'center', color: '#333' },
  popularTitle: { fontWeight: 'bold', fontSize: 16, marginHorizontal: 16, marginTop: 16 },
  popularList: { marginHorizontal: 16, marginTop: 8 },
  popularCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 12, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  popularIcon: { fontSize: 22, marginRight: 12 },
  popularLabel: { fontWeight: '500', fontSize: 15, color: '#333' },
  continueBtn: { backgroundColor: '#4CAF50', borderRadius: 20, margin: 24, paddingVertical: 16, alignItems: 'center', opacity: 1, shadowColor: '#4CAF50', shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  continueBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default SuggestionPage; 