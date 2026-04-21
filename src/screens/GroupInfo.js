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
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: { padding: 15, backgroundColor: "#f5f5f5", borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "600" },
  ra: { fontSize: 14, color: "#666", marginTop: 5 }
});