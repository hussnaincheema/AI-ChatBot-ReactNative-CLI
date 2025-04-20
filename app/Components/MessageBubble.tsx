import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type MessageBubbleProps = {
  text: string;
  sender: 'user' | 'gemini';
};

const MessageBubble = ({text, sender}: MessageBubbleProps) => {
  return (
    <View
      style={[
        styles.message,
        sender === 'user' ? styles.userMessage : styles.geminiMessage,
      ]}>
      <Text
        style={[
          styles.messageText,
          sender === 'user' ? styles.userMessageText : styles.geminiMessageText,
        ]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 1,
  },
  geminiMessage: {
    backgroundColor: '#494F55',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 15,
  },
  messageText: {
    color: 'white',
  },
  userMessageText: {
    color: 'white',
  },
  geminiMessageText: {
    color: 'white',
  },
});

export default MessageBubble;
