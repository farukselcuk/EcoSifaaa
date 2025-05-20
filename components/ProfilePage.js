import Constants from 'expo-constants';
import React, { useState } from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

// Import dummy data or define it here
const initialLayout = { width: Dimensions.get('window').width };

const KisielRoute = () => (
  <ScrollView style={styles.tabContentScroll} contentContainerStyle={styles.tabContentPadding}>
    <Text style={styles.inputLabel}>Ad Soyad</Text>
    <TextInput style={styles.input} value="Ayşe Yılmaz" />
    <Text style={styles.inputLabel}>E-posta</Text>
    <TextInput style={styles.input} value="ayse.yilmaz@email.com" keyboardType="email-address" />
    <Text style={styles.inputLabel}>Telefon</Text>
    <TextInput style={styles.input} value="+90 555 123 4567" keyboardType="phone-pad" />
    <Text style={styles.inputLabel}>Doğum Tarihi</Text>
    {/* TODO: Add Date Picker */}
    <View style={styles.input}><Text>15.05.1990</Text></View>
    <Text style={styles.inputLabel}>Cinsiyet</Text>
    {/* TODO: Add Gender Picker */}
    <View style={styles.input}><Text>Kadın</Text></View>
  </ScrollView>
);

const SaglikRoute = () => (
  <ScrollView style={styles.tabContentScroll} contentContainerStyle={styles.tabContentPadding}>
    <Text style={styles.inputLabel}>Boy (cm)</Text>
    <TextInput style={styles.input} value="165" keyboardType="numeric" />
    <Text style={styles.inputLabel}>Kilo (kg)</Text>
    <TextInput style={styles.input} value="60" keyboardType="numeric" />
    <Text style={styles.inputLabel}>Kronik Rahatsızlıklar</Text>
    {/* TODO: Add Tags/Add Button */}
    <View style={styles.tagRow}>
      <View style={styles.tag}><Text>Migren</Text><Text> x</Text></View>
      <View style={styles.tag}><Text>Alerji</Text><Text> x</Text></View>
      <TouchableOpacity style={styles.addButton}><Text style={styles.addButtonText}>+ Ekle</Text></TouchableOpacity>
    </View>
    <Text style={styles.inputLabel}>Alerjiler</Text>
     {/* TODO: Add Tags/Add Button */}
     <View style={styles.tagRow}>
      <View style={styles.tag}><Text>Polen</Text><Text> x</Text></View>
      <View style={styles.tag}><Text>Arı Sokması</Text><Text> x</Text></View>
      <TouchableOpacity style={styles.addButton}><Text style={styles.addButtonText}>+ Ekle</Text></TouchableOpacity>
    </View>
    <Text style={styles.inputLabel}>Kullandığınız ilaçlar</Text>
    <TextInput style={[styles.input, {height: 100}]} multiline value="Düzenli kullandığınız ilaçları buraya yazabilirsiniz..." />
    <TouchableOpacity style={styles.saveButton}><Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text></TouchableOpacity>
  </ScrollView>
);

const TercihlerRoute = () => (
  <ScrollView style={styles.tabContentScroll} contentContainerStyle={styles.tabContentPadding}>
     <Text style={styles.inputLabel}>Bildirim Tercihleri</Text>
     {/* TODO: Add Toggle Buttons */}
     <View style={styles.preferenceRow}><Text>Günlük Hatırlatmalar</Text><Text> Toggle </Text></View>
     <View style={styles.preferenceRow}><Text>Yeni Tedavi Önerileri</Text><Text> Toggle </Text></View>
     <View style={styles.preferenceRow}><Text>Uygulama Güncellemeleri</Text><Text> Toggle </Text></View>

    <Text style={styles.inputLabel}>Tercih Ettiğiniz Tedavi Yöntemleri</Text>
     {/* TODO: Add Checkboxes */}
     <View style={styles.preferenceRow}><Text>Bitkisel Tedaviler</Text><Text> Checkbox </Text></View>
     <View style={styles.preferenceRow}><Text>Aromaterapi</Text><Text> Checkbox </Text></View>
     <View style={styles.preferenceRow}><Text>Meditasyon</Text><Text> Checkbox </Text></View>
     <View style={styles.preferenceRow}><Text>Akupunktur</Text><Text> Checkbox </Text></View>
     <View style={styles.preferenceRow}><Text>Yoga</Text><Text> Checkbox </Text></View>

    <Text style={styles.inputLabel}>Dil</Text>
     {/* TODO: Add Language Picker */}
     <View style={styles.input}><Text>Türkçe</Text></View>

    <TouchableOpacity style={styles.saveButton}><Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text></TouchableOpacity>
  </ScrollView>
);

const renderScene = SceneMap({
  kisiel: KisielRoute,
  saglik: SaglikRoute,
  tercihler: TercihlerRoute,
});

const ProfilePage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'kisiel', title: 'Kişisel' },
    { key: 'saglik', title: 'Sağlık' },
    { key: 'tercihler', title: 'Tercihler' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#00c97b' }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#00c97b', fontWeight: 'bold' }}
    />
  );

  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

  return (
    <ScrollView style={[styles.container, { paddingTop: statusBarHeight + 10 }]} contentContainerStyle={{ paddingBottom: 120 }}>
      {/* Header */}
      <View style={styles.header}>
        {/* TODO: Add back button */}
        <View style={styles.logoRow}>
           <View style={styles.logoIcon}><Text style={styles.logoIconText}>👤</Text></View>
           <View>
             <Text style={styles.logoTitle}>Profilim</Text>
             <Text style={styles.logoDesc}>Kişisel bilgileriniz ve tercihleriniz</Text>
           </View>
         </View>
         <View style={styles.headerIcons}>
           <Text style={styles.headerIcon}>⚙️</Text>
         </View>
       </View>

       {/* Profile Summary */}
       <View style={styles.profileSummary}>
         {/* TODO: Add Avatar */}
         <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>AY</Text></View>
         <View>
           <Text style={styles.profileName}>Ayşe Yılmaz</Text>
           <Text style={styles.profileEmail}>ayse.yilmaz@email.com</Text>
         </View>
       </View>

       {/* Profile Completion */}
       <View style={styles.completionBox}>
         <Text style={styles.completionTitle}>Profil Tamamlama</Text>
         {/* TODO: Add Progress Bar */}
         <Text style={styles.completionText}>Profilinizi tamamlayarak daha kişiselleştirilmiş öneriler alın.</Text>
         <TouchableOpacity style={styles.completeProfileBtn}><Text style={styles.completeProfileBtnText}>Profili Tamamla</Text></TouchableOpacity>
       </View>

       {/* Tabs */}
       <TabView
         navigationState={{ index, routes }}
         renderScene={renderScene}
         onIndexChange={setIndex}
         initialLayout={initialLayout}
         renderTabBar={renderTabBar}
         style={{ flex: 1 }}
       />

       {/* Hesap & Destek */}
       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Hesap</Text>
         <TouchableOpacity style={styles.menuItem}>
           {/* TODO: Add Icon */}
           <Text style={styles.menuItemText}>Hesap Bilgileri</Text>
           <Text style={styles.menuItemArrow}>{'>'}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem}>
            {/* TODO: Add Icon */}
           <Text style={styles.menuItemText}>Gizlilik ve Güvenlik</Text>
           <Text style={styles.menuItemArrow}>{'>'}</Text>
         </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
             {/* TODO: Add Icon */}
            <Text style={styles.menuItemText}>Ödeme Yöntemleri</Text>
            <Text style={styles.menuItemTag}>Yeni</Text>
            <Text style={styles.menuItemArrow}>{'>'}</Text>
          </TouchableOpacity>
       </View>

       <View style={styles.section}>
         <Text style={styles.sectionTitle}>Destek</Text>
         <TouchableOpacity style={styles.menuItem}>
           {/* TODO: Add Icon */}
           <Text style={styles.menuItemText}>Yardım Merkezi</Text>
            <Text style={styles.menuItemArrow}>{'>'}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem}>
            {/* TODO: Add Icon */}
           <Text style={styles.menuItemText}>Bize Ulaşın</Text>
            <Text style={styles.menuItemArrow}>{'>'}</Text>
         </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
             {/* TODO: Add Icon */}
            <Text style={styles.menuItemText}>Uygulamayı Değerlendir</Text>
            <Text style={styles.menuItemArrow}>{'>'}</Text>
          </TouchableOpacity>
       </View>

       {/* Çıkış Yap Butonu */}
       <TouchableOpacity style={styles.logoutButton}><Text style={styles.logoutButtonText}>Çıkış Yap</Text></TouchableOpacity>

      {/* Bottom Nav bar space */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#00c97b' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { backgroundColor: '#e6fff2', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoIconText: { color: '#00c97b', fontSize: 24, fontWeight: 'bold' },
  logoTitle: { fontWeight: 'bold', fontSize: 18, color: '#fff' },
  logoDesc: { fontSize: 13, color: '#fff', opacity: 0.8 },
  headerIcons: { flexDirection: 'row' },
  headerIcon: { fontSize: 22, marginLeft: 16, color: '#fff' },

  profileSummary: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#00c97b' },
  avatarPlaceholder: { backgroundColor: '#e6fff2', borderRadius: 30, width: 60, height: 60, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { color: '#00c97b', fontSize: 28, fontWeight: 'bold' },
  profileName: { fontWeight: 'bold', fontSize: 18, color: '#fff' },
  profileEmail: { fontSize: 14, color: '#fff', opacity: 0.8 },

  completionBox: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginHorizontal: 16, marginTop: -30, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 5 },
  completionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#333' },
  completionText: { color: '#888', fontSize: 13, marginBottom: 12 },
  completeProfileBtn: { backgroundColor: '#00c97b', borderRadius: 20, paddingVertical: 12, alignItems: 'center' },
  completeProfileBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  tabContentScroll: { paddingHorizontal: 16 },
  tabContentPadding: { paddingBottom: 20 },

  inputLabel: { fontSize: 14, color: '#555', marginTop: 16, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 16, borderWidth: 1, borderColor: '#eee' },

  tagRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 4 },
  tag: { flexDirection: 'row', backgroundColor: '#e6fff2', color: '#00c97b', borderRadius: 12, paddingVertical: 6, paddingHorizontal: 10, marginRight: 8, marginBottom: 8, alignItems: 'center' },
  addButton: { backgroundColor: '#00c97b', borderRadius: 12, paddingVertical: 6, paddingHorizontal: 10, marginBottom: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  preferenceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },

  section: { marginHorizontal: 16, marginTop: 24 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#eee' },
  menuItemText: { flex: 1, fontSize: 16, color: '#333' },
  menuItemArrow: { fontSize: 18, color: '#ccc', marginLeft: 8 },
  menuItemTag: { backgroundColor: '#e6fff2', color: '#00c97b', borderRadius: 8, paddingHorizontal: 6, fontSize: 12, marginRight: 8, fontWeight: 'bold' },

  logoutButton: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, marginHorizontal: 16, marginTop: 24, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  logoutButtonText: { color: '#ff4d4f', fontWeight: 'bold', fontSize: 16 },
});

export default ProfilePage; 