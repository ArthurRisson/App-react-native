import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { getProducts, getCategories, getProductsByCategory } from "../services/productService";

export default function ProductList({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Configuração do Header exigida no PDF
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Produtos",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Button title="Logout" onPress={() => navigation.replace("Login")} color="#d9534f" />
      ),
      headerRight: () => (
        <Button title="Info" onPress={() => navigation.navigate("GroupInfo")} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    setLoading(true);
    const [productsRes, categoriesRes] = await Promise.all([getProducts(), getCategories()]);
    if (productsRes.success) setItems(productsRes.data);
    if (categoriesRes.success) setCategories(categoriesRes.data);
    setLoading(false);
  }

  async function handleFilter(category) {
    setLoading(true);
    setSelectedCategory(category);
    if (category === "") {
      const response = await getProducts();
      if (response.success) setItems(response.data);
    } else {
      const response = await getProductsByCategory(category);
      if (response.success) setItems(response.data);
    }
    setLoading(false);
  }

  // Função para formatar preço em Reais (R$)
  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  if (loading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filtro de Categorias */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedCategory === "" && styles.filterActive]} 
            onPress={() => handleFilter("")}
          >
            <Text style={[styles.filterText, selectedCategory === "" && styles.filterTextActive]}>Todos</Text>
          </TouchableOpacity>
          
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.filterButton, selectedCategory === cat && styles.filterActive]} 
              onPress={() => handleFilter(cat)}
            >
              <Text style={[styles.filterText, selectedCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Listagem com ActivityIndicator se estiver recarregando o filtro */}
      {loading ? (
         <View style={styles.centered}><ActivityIndicator size="large" /></View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
            >
              <Image style={styles.cardImage} source={{ uri: item.image }} resizeMode="contain" />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 8 },
  filterContainer: { padding: 10, borderBottomWidth: 1, borderColor: "#eee" },
  filterButton: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: "#f0f0f0", borderRadius: 20, marginRight: 10 },
  filterActive: { backgroundColor: "#1a1a1a" },
  filterText: { color: "#333", fontSize: 12 },
  filterTextActive: { color: "#fff", fontWeight: "bold" },
  card: { flex: 1, margin: 5, backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#eee", overflow: "hidden" },
  cardImage: { width: "100%", height: 120, backgroundColor: "#fff", marginTop: 10 },
  cardTitle: { fontSize: 13, fontWeight: "500", color: "#1a1a1a", marginBottom: 5 },
  cardPrice: { fontSize: 16, fontWeight: "bold", color: "#2E8B57" },
  cardBody: { padding: 10 }
});