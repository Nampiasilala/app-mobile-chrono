import React, { useState, useRef } from 'react';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';

export default function Chronometer({ mode }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
      const start = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - start);
      }, 1);
    }
  };

  const stopTimer = () => {
    if (mode === 'simple') {
      if (running) {
        setRunning(false);
        clearInterval(timerRef.current);
      }
    } else if (mode === 'race') {
      setHistory([...history, time]);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    setHistory([]);
  };

  const finishTimer = () => {
    setRunning(false);
    clearInterval(timerRef.current);
    setHistory([...history, time]);
  };

  const formatTime = (time) => {
    const getMilliseconds = `00${time % 1000}`.slice(-3);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const getMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);

    return `${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
  };

  return (
    <View>
      <Text style={styles.time}>{formatTime(time)}</Text>
      {mode === 'simple' ? (
        <View style={styles.buttonContainer}>
          <Button style={styles.textbutton} title="Start" onPress={startTimer} />
          <Button title="Stop" onPress={stopTimer} />
          <Button title="Reset" onPress={resetTimer} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Start" onPress={startTimer} />
          <Button title="Stop" onPress={stopTimer} />
          <Button title="Finish" onPress={finishTimer} />
          <Button title="Reset" onPress={resetTimer} />
        </View>
      )}
      <ScrollView style={styles.historyContainer}>
        {history.map((record, index) => (
          <Text key={index} style={styles.historyItem}>
            {index + 1}. {formatTime(record)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 60,
    marginBottom: 30,
    color:'#F60000',
    // alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#BA0BD7',
    borderTopColor: '#BA0BD7',
    borderTopWidth: 5,
  },
  historyItem: {
    fontSize: 20,
    marginVertical: 2,
  },
   
  
});
