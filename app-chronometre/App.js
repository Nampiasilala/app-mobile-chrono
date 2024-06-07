import React, { useState } from 'react';
// import { Text, View, StyleSheet, Picker } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Chronometer from './components/Chronometer';

export default function App() {
  const [mode, setMode] = useState('simple');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ChronoApp</Text>
        <Picker
          selectedValue={mode}
          style={styles.picker}
          onValueChange={(itemValue) => setMode(itemValue)}
        >
          <Picker.Item label="Mode simple" value="simple" />
          <Picker.Item label="Mode course" value="race" />
        </Picker>
      </View>
      <View style={styles.content}>
        <Chronometer mode={mode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF7FB',
  },
  header: {
    backgroundColor: '#ECECEC',
    padding: 15,
    borderBottomWidth: 5,
    borderBottomColor: '#BA0BD7',
    borderTopColor: '#BA0BD7',
    borderTopWidth: 5,
    width: '100%',
    position: 'absolute',
    top: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 40,
    color: 'black',
  },
  picker: {
  
    height: 35,
    width: 160,
    color: 'blue',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
});
