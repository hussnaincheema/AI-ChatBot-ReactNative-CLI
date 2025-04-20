import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MessageBubble from '../Components/MessageBubble';
import fetchGeminiReply from '../Services/GeminiApi';
import Header from '../Components/Header';

type ChatScreenProps = {
  text: string;
  sender: 'user' | 'gemini';
};

const ChatScreen = () => {
  const [msg, setMsg] = useState<string>('');
  const [messages, setMessages] = useState<ChatScreenProps[]>([]);

  const renderItem = ({item}: {item: ChatScreenProps}) => {
    return <MessageBubble text={item.text} sender={item.sender} />;
  };

  const handleButtonClick = async () => {
    if (!msg.trim()) return;

    const userMessage: ChatScreenProps = {text: msg, sender: 'user'};
    setMessages(prev => [userMessage, ...prev]);
    setMsg('');

    try {
      const reply = await fetchGeminiReply(msg);

      const geminiMessage: ChatScreenProps = {text: reply, sender: 'gemini'};
      setMessages(prev => [geminiMessage, ...prev]);
    } catch (error) {
      const errorMessage: ChatScreenProps = {
        text: 'Error occurred',
        sender: 'gemini',
      };
      setMessages(prev => [errorMessage, ...prev]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {messages.length === 0 && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>What can I help with?</Text>
        </View>
      )}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything"
          value={msg}
          onChangeText={setMsg}
          placeholderTextColor="white"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#494F55',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#494F55',
  },
});

export default ChatScreen;
