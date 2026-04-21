import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
import { getProductById } from "../services/productService";

export default function ProductDetail({ navigation, route }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Detalhes do Produto" });
  }, []);

  useEffect(() => {
    getItem();
  }, []);

  async function getItem() {
    setLoading(true);
    const response = await getProductById(id);
    if (response.success) {
      setItem(response.data);
    }
    setLoading(false);
  }

  const formatPrice = (price) => {
    if (!price) return "";
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  if (loading || !item) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image }} resizeMode="contain" />

      <View style={styles.body}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.category?.toUpperCase()}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ {item.rating?.rate} ({item.rating?.count} avaliações)</Text>
        </View>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300, backgroundColor: "#fff", marginVertical: 20 },
  body: { padding: 20 },
  tag: { alignSelf: "flex-start", backgroundColor: "#eee", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginBottom: 10 },
  tagText: { fontSize: 12, fontWeight: "bold", color: "#555" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a1a1a", marginBottom: 10 },
  price: { fontSize: 28, fontWeight: "bold", color: "#2E8B57", marginBottom: 15 },
  ratingContainer: { marginBottom: 20 },
  ratingText: { fontSize: 16, color: "#666" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 15, color: "#444", lineHeight: 24 }
});