import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const windowHeight = Dimensions.get('window').height;

const HomePage = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120, minHeight: windowHeight }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}><Text style={styles.logoIconText}>+</Text></View>
          <View>
            <Text style={styles.logoTitle}>ŞifaTech</Text>
            <Text style={styles.logoDesc}>Doğal Tedavi Rehberi</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Text style={styles.headerIcon}>🔍</Text>
          <Text style={styles.headerIcon}>🔔</Text>
        </View>
      </View>
      {/* Welcome Box */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Hoş Geldiniz!</Text>
        <Text style={styles.welcomeDesc}>Bugün kendinizi nasıl hissediyorsunuz?</Text>
        <View style={styles.moodButtons}>
          <TouchableOpacity style={styles.moodBtn}><Text style={styles.moodBtnText}>Çok iyi</Text></TouchableOpacity>
          <TouchableOpacity style={styles.moodBtn}><Text style={styles.moodBtnText}>Normal</Text></TouchableOpacity>
          <TouchableOpacity style={styles.moodBtn}><Text style={styles.moodBtnText}>Yorgun</Text></TouchableOpacity>
        </View>
      </View>
      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
        <View style={styles.quickAccessRow}>
          <View style={[styles.quickItem, {backgroundColor: '#e6f0ff'}]}><Text style={styles.quickText}>Tavsiyeler</Text></View>
          <View style={[styles.quickItem, {backgroundColor: '#f3e6ff'}]}><Text style={styles.quickText}>Bitkiler</Text></View>
          <View style={[styles.quickItem, {backgroundColor: '#fff7e6'}]}><Text style={styles.quickText}>Hatırlatıcı</Text></View>
          <View style={[styles.quickItem, {backgroundColor: '#ffe6e6'}]}><Text style={styles.quickText}>Favoriler</Text></View>
        </View>
      </View>
      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <Text style={styles.sectionLink}>Tümünü Gör</Text>
        </View>
        <View style={styles.categoryRow}>
          <View style={[styles.categoryCard, {backgroundColor: '#e6fff2'}]}><Text style={styles.categoryText}>Şifalı Bitkiler</Text></View>
          <View style={[styles.categoryCard, {backgroundColor: '#e6f0ff'}]}><Text style={styles.categoryText}>Akupunktur</Text></View>
        </View>
        <View style={styles.categoryRow}>
          <View style={[styles.categoryCard, {backgroundColor: '#f3e6ff'}]}><Text style={styles.categoryText}>Meditasyon</Text></View>
          <View style={[styles.categoryCard, {backgroundColor: '#fff7e6'}]}><Text style={styles.categoryText}>Beslenme</Text></View>
        </View>
      </View>
      {/* Popular Treatments */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Popüler Tedaviler</Text>
          <Text style={styles.sectionLink}>Tümünü Gör</Text>
        </View>
        <View style={styles.treatmentCard}>
          <Text style={styles.treatmentTitle}>Zencefil Çayı</Text>
          <Text style={styles.treatmentDesc}>Soğuk algınlığı ve sindirim sorunları için</Text>
        </View>
        <View style={styles.treatmentCard}>
          <Text style={styles.treatmentTitle}>Lavanta Yağı</Text>
          <Text style={styles.treatmentDesc}>Stres ve uyku sorunları için</Text>
        </View>
        <View style={styles.treatmentCard}>
          <Text style={styles.treatmentTitle}>Aloe Vera Jeli</Text>
          <Text style={styles.treatmentDesc}>Cilt sorunları ve yanıklar için</Text>
        </View>
      </View>
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
  welcomeBox: { backgroundColor: '#1ed6b7', borderRadius: 20, padding: 20, margin: 16, shadowColor: '#00c97b', shadowOpacity: 0.1, shadowRadius: 8 },
  welcomeTitle: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
  welcomeDesc: { color: '#fff', marginTop: 4, marginBottom: 10 },
  moodButtons: { flexDirection: 'row', marginTop: 8 },
  moodBtn: { backgroundColor: '#fff', borderRadius: 20, marginRight: 12, paddingVertical: 8, paddingHorizontal: 20 },
  moodBtnText: { color: '#00c97b', fontWeight: 'bold' },
  section: { marginHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionLink: { color: '#00c97b', fontWeight: 'bold' },
  quickAccessRow: { flexDirection: 'row', marginTop: 8 },
  quickItem: { flex: 1, borderRadius: 16, padding: 16, alignItems: 'center', marginRight: 8 },
  quickText: { fontWeight: '500' },
  categoryRow: { flexDirection: 'row', marginTop: 8 },
  categoryCard: { flex: 1, borderRadius: 16, padding: 20, alignItems: 'center', marginRight: 12 },
  categoryText: { fontWeight: '500' },
  treatmentCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 },
  treatmentTitle: { fontWeight: 'bold', fontSize: 16 },
  treatmentDesc: { color: '#888', fontSize: 13, marginTop: 2 },
});

export default HomePage; 