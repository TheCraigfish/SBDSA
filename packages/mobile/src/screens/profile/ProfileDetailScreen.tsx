import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileDetail'>;

const ProfileDetailScreen: React.FC<Props> = ({ navigation }) => {
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handlePersonalRecords = () => {
    navigation.navigate('PersonalRecords');
  };

  const handleAnalytics = () => {
    navigation.navigate('Analytics');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>472.5</Text>
            <Text style={styles.statLabel}>Total (kg)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>152.5</Text>
            <Text style={styles.statLabel}>Squat (kg)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>92.5</Text>
            <Text style={styles.statLabel}>Bench (kg)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>227.5</Text>
            <Text style={styles.statLabel}>Deadlift (kg)</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={handlePersonalRecords}>
            <Text style={styles.menuItemText}>Personal Records</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleAnalytics}>
            <Text style={styles.menuItemText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00875A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#00875A',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00875A',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  menuSection: {
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ProfileDetailScreen;