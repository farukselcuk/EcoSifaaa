import Constants from 'expo-constants';
import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const windowHeight = Dimensions.get('window').height;

const HomePage = () => {
  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight + 10 }]} contentContainerStyle={{ paddingBottom: 120, minHeight: windowHeight }}>
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
          <View style={styles.quickItem}>
            <View style={[styles.quickIconCircle, { backgroundColor: '#E3F2FD' }]}><Text style={[styles.quickIcon, { color: '#2196F3' }]}>📋</Text></View>
            <Text style={styles.quickText}>Tavsiyeler</Text>
          </View>
          <View style={styles.quickItem}>
             <View style={[styles.quickIconCircle, { backgroundColor: '#F3E5F5' }]}><Text style={[styles.quickIcon, { color: '#9C27B0' }]}>📦</Text></View>
            <Text style={styles.quickText}>Bitkiler</Text>
          </View>
          <View style={styles.quickItem}>
            <View style={[styles.quickIconCircle, { backgroundColor: '#FFF3E0' }]}><Text style={[styles.quickIcon, { color: '#FF9800' }]}>⏰</Text></View>
            <Text style={styles.quickText}>Hatırlatıcı</Text>
          </View>
          <View style={styles.quickItem}>
            <View style={[styles.quickIconCircle, { backgroundColor: '#FCE4EC' }]}><Text style={[styles.quickIcon, { color: '#E91E63' }]}>❤️</Text></View>
            <Text style={styles.quickText}>Favoriler</Text>
          </View>
        </View>
      </View>
      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <Text style={styles.sectionLink}>Tümünü Gör</Text>
        </View>
        <View style={styles.categoryRow}>
          <View style={styles.categoryCard}>
             <View style={[styles.categoryIconCircle, {backgroundColor: '#E8F5E9'}]}><Text style={[styles.categoryIcon, {color: '#4CAF50'}]}>🍃</Text></View>
            <Text style={styles.categoryText}>Şifalı Bitkiler</Text>
            <Text style={{fontSize: 12, color: '#666666', marginTop: 4}}>120+ bitki ve kullanımları</Text>
          </View>
          <View style={styles.categoryCard}>
             <View style={[styles.categoryIconCircle, {backgroundColor: '#E3F2FD'}]}><Text style={[styles.categoryIcon, {color: '#2196F3'}]}>⚡</Text></View>
            <Text style={styles.categoryText}>Akupunktur</Text>
            <Text style={{fontSize: 12, color: '#666666', marginTop: 4}}>Noktalar ve faydaları</Text>
          </View>
           <View style={styles.categoryCard}>
             <View style={[styles.categoryIconCircle, {backgroundColor: '#F3E5F5'}]}><Text style={[styles.categoryIcon, {color: '#9C27B0'}]}>😊</Text></View>
            <Text style={styles.categoryText}>Meditasyon</Text>
             <Text style={{fontSize: 12, color: '#666666', marginTop: 4}}>Zihin ve beden sağlığı</Text>
          </View>
           <View style={styles.categoryCard}>
             <View style={[styles.categoryIconCircle, {backgroundColor: '#FFF8E1'}]}><Text style={[styles.categoryIcon, {color: '#FFC107'}]}>📝</Text></View>
            <Text style={styles.categoryText}>Beslenme</Text>
            <Text style={{fontSize: 12, color: '#666666', marginTop: 4}}>Sağlıklı tarifler</Text>
          </View>
        </View>
      </View>
      {/* Popular Treatments */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Popüler Tedaviler</Text>
          <Text style={styles.sectionLink}>Tümünü Gör</Text>
        </View>
        <View style={styles.treatmentCard}>
          <View style={[styles.quickIconCircle, {backgroundColor: '#E8F5E9', width: 50, height: 50, borderRadius: 25, marginRight: 16}]}><Text style={[styles.quickIcon, {color: '#4CAF50'}]}>📖</Text></View>
          <View style={{flex: 1}}>
            <Text style={styles.treatmentTitle}>Zencefil Çayı</Text>
            <Text style={styles.treatmentDesc}>Soğuk algınlığı ve sindirim sorunları için</Text>
          </View>
        </View>
        <View style={styles.treatmentCard}>
          <View style={[styles.quickIconCircle, {backgroundColor: '#E3F2FD', width: 50, height: 50, borderRadius: 25, marginRight: 16}]}><Text style={[styles.quickIcon, {color: '#2196F3'}]}>🧴</Text></View>
          <View style={{flex: 1}}>
            <Text style={styles.treatmentTitle}>Lavanta Yağı</Text>
            <Text style={styles.treatmentDesc}>Stres ve uyku sorunları için</Text>
          </View>
        </View>
        <View style={styles.treatmentCard}>
          <View style={[styles.quickIconCircle, {backgroundColor: '#F3E5F5', width: 50, height: 50, borderRadius: 25, marginRight: 16}]}><Text style={[styles.quickIcon, {color: '#9C27B0'}]}>🧴</Text></View>
          <View style={{flex: 1}}>
            <Text style={styles.treatmentTitle}>Aloe Vera Jeli</Text>
            <Text style={styles.treatmentDesc}>Cilt sorunları ve yanıklar için</Text>
          </View>
        </View>
      </View>
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
  welcomeBox: { backgroundColor: '#4CAF50', borderRadius: 20, padding: 20, margin: 16, shadowColor: '#4CAF50', shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  welcomeTitle: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
  welcomeDesc: { color: '#fff', marginTop: 4, marginBottom: 10 },
  moodButtons: { flexDirection: 'row', marginTop: 8 },
  moodBtn: { backgroundColor: '#fff', borderRadius: 20, marginRight: 12, paddingVertical: 8, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  moodBtnText: { color: '#4CAF50', fontWeight: 'bold' },
  section: { marginHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionLink: { color: '#4CAF50', fontWeight: 'bold' },
  quickAccessRow: { flexDirection: 'row', marginTop: 8 },
  quickItem: { flex: 1, alignItems: 'center', marginRight: 8 },
  quickIconCircle: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  quickIcon: { fontSize: 24 },
  quickText: { fontWeight: '500', fontSize: 12, textAlign: 'center', color: '#333333' },
  categoryRow: { flexDirection: 'row', marginTop: 8 },
  categoryCard: { flex: 1, borderRadius: 16, padding: 20, flexBasis: '48%', minWidth: 120, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, alignItems: 'center' },
  categoryIconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  categoryIcon: { fontSize: 20 },
  categoryText: { fontWeight: '500', fontSize: 14, textAlign: 'center', color: '#333333' },
  treatmentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginHorizontal: 16, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  treatmentTitle: { fontWeight: 'bold', fontSize: 16 },
  treatmentDesc: { color: '#666666', fontSize: 13, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingStar: { color: '#FFD700', marginRight: 2 },
  ratingText: { color: '#666666', marginRight: 8, fontWeight: 'bold' },
  tag: { backgroundColor: '#E8F5E9', color: '#4CAF50', borderRadius: 8, paddingHorizontal: 8, marginRight: 4, fontSize: 12 },
  heart: { fontSize: 22, color: '#E0E0E0', marginLeft: 8 },
});

export default HomePage; 