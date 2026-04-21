import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GroupInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvedores do App</Text>
      
      
      <View style={styles.card}>
        <Text style={styles.name}>Arthur Risson</Text>
        <Text style={styles.ra}>RA: 1138099</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f8fc"
  },
  title: { 
    fontSize: 28, 
    fontWeight: "800", 
    marginBottom: 32, 
    textAlign: "center",
    color: "#2E5090"
  },
  card: { 
    padding: 18, 
    backgroundColor: "#fff", 
    borderRadius: 14, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e8ecf2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  name: { 
    fontSize: 20, 
    fontWeight: "700",
    color: "#2E5090"
  },
  ra: { 
    fontSize: 14, 
    color: "#7CB342", 
    marginTop: 8,
    fontWeight: "600"
  }
});