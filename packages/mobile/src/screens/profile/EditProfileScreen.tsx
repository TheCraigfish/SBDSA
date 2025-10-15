import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '@sbdsa/shared';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('John');
  const [lastName, setLastName] = React.useState('Doe');
  const [email, setEmail] = React.useState('john.doe@example.com');
  const [bio, setBio] = React.useState('Powerlifting enthusiast');
  const [gym, setGym] = React.useState('Powerlifting Gym');

  const handleSave = () => {
    // Placeholder save logic
    Alert.alert('Success', 'Profile updated successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
        />
        
        <Text style={styles.label}>Gym</Text>
        <TextInput
          style={styles.input}
          value={gym}
          onChangeText={setGym}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#333',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00875A',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;