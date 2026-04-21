import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { login } from "../services/productService";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    setLoading(true);
    const response = await login(username, password);
    setLoading(false);

    if (response.success) {
      
      navigation.replace("ProductList");
    } else {
      Alert.alert("Erro", response.errorMessage);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loja de roupas online</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    backgroundColor: "#f5f8fc"
  },
  title: { 
    fontSize: 32, 
    fontWeight: "800", 
    textAlign: "center", 
    marginBottom: 40,
    color: "#2E5090"
  },
  input: { 
    borderWidth: 2, 
    borderColor: "#e0e8f0", 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#333"
  },
  button: { 
    backgroundColor: "#2E5090", 
    padding: 16, 
    borderRadius: 12, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 16 
  }
});