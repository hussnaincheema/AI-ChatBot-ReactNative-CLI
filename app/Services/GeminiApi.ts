import { Alert } from "react-native";

const GEMINI_API_KEY = 'AIzaSyC0iBPYwdY-O5uNetQvYR8R4EhpoeO4uAA';

const fetchGeminiReply = async (msg: string) => {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers:{
            "Content-Type": "application/json",
      },
      body: JSON.stringify({
            contents: [{parts: [{text: msg}]}],
      }),
});

const data = await response.json();
const content = data?.candidates?.[0]?.content;
return content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
}

export default fetchGeminiReply;
