import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>CHATBOT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  headerText: {
    color: '#494F55',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
