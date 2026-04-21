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
  container: { flex: 1, backgroundColor: "#f5f8fc" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { 
    width: "100%", 
    height: 320, 
    backgroundColor: "#fff", 
    marginVertical: 16
  },
  body: { padding: 20 },
  tag: { 
    alignSelf: "flex-start", 
    backgroundColor: "#e8f3e8", 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 18, 
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#7CB342"
  },
  tagText: { 
    fontSize: 12, 
    fontWeight: "700", 
    color: "#558B2F",
    textTransform: "capitalize"
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#2E5090", 
    marginBottom: 12,
    lineHeight: 30
  },
  price: { 
    fontSize: 32, 
    fontWeight: "800", 
    color: "#7CB342", 
    marginBottom: 18
  },
  ratingContainer: { 
    marginBottom: 24,
    backgroundColor: "#f0f4f9",
    padding: 12,
    borderRadius: 10
  },
  ratingText: { 
    fontSize: 16, 
    color: "#2E5090",
    fontWeight: "600"
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 12,
    color: "#2E5090"
  },
  description: { 
    fontSize: 15, 
    color: "#555", 
    lineHeight: 26
  }
});