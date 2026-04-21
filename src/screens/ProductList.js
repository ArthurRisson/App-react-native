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
  container: { flex: 1, backgroundColor: "#f5f8fc" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 12 },
  filterContainer: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderColor: "#e0e8f0",
    backgroundColor: "#fff"
  },
  filterButton: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    backgroundColor: "#f0f4f9", 
    borderRadius: 20, 
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: "#e0e8f0"
  },
  filterActive: { 
    backgroundColor: "#2E5090",
    borderColor: "#2E5090"
  },
  filterText: { color: "#666", fontSize: 13, fontWeight: "600" },
  filterTextActive: { color: "#fff", fontWeight: "700" },
  card: { 
    flex: 1, 
    margin: 6, 
    backgroundColor: "#fff", 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: "#e8ecf2", 
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  cardImage: { 
    width: "100%", 
    height: 140, 
    backgroundColor: "#f5f8fc", 
    marginTop: 12
  },
  cardTitle: { 
    fontSize: 13, 
    fontWeight: "600", 
    color: "#2E5090", 
    marginBottom: 8
  },
  cardPrice: { 
    fontSize: 17, 
    fontWeight: "700", 
    color: "#7CB342"
  },
  cardBody: { padding: 12 }
});