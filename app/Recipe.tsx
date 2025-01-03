import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Recipe = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Recipe Heaven! 🍴</Text>
      <Text style={styles.quote}>
        "Cooking is an art, and every ingredient tells a story."
      </Text>

      <Link href="/SearchByIngredients" style={styles.link}>
        <Text style={styles.linkText}>Find Recipe by Ingredients 🥕</Text>
      </Link>

      
      <Link href="/SearchByRecipe" style={styles.link}>
        <Text style={styles.linkText}>Explore Recipes by Name 🍲</Text>
      </Link>

      
      <Link href="/SearchByCusine" style={styles.link}>
        <Text style={styles.linkText}>Search by your favourite cusine 🥗</Text>
      </Link>

      <Text style={styles.footer}>
        "Good food is the foundation of genuine happiness."
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF5F5",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 30,
    color: "#FF6666",
    textAlign: "center",
  },
  quote: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  link: {
    backgroundColor: "#FF6666", 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: 260,
    alignItems: "center",
    justifyContent: "center",
    display: "flex", 
  },

  linkText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  footer: {
    marginTop: 70,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 20,
    backgroundColor: "#FFF5F5",
  },
});

export default Recipe;
