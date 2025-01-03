import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const recipes = require("../constant/Cleaned_Indian_Food_Dataset (1).json");

interface Recipe {
  TranslatedRecipeName: string;
  TotalTimeInMins: number;
  Cuisine: string;
  "image-url": string;
  "Cleaned-Ingredients": string;
  TranslatedInstructions: string;
}

const App = () => {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("All");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const cuisineSet = new Set(
      recipes.map((recipe: Recipe) => recipe.Cuisine || "Unknown Cuisine")
    );
    setCuisines(["All", ...Array.from(cuisineSet) as string[]]);
    setFilteredRecipes(recipes);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCuisine === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe: { Cuisine: string; }) => recipe.Cuisine === selectedCuisine)
      );
    }
  }, [selectedCuisine]);

  const handleSave = async (recipe: Recipe) => {
    try {
      const savedRecipes = await AsyncStorage.getItem("savedRecipes");
      const parsedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];
      parsedRecipes.push(recipe);

      await AsyncStorage.setItem("savedRecipes", JSON.stringify(parsedRecipes));

      
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 700);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item["image-url"] }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.TranslatedRecipeName}</Text>
      <Text style={styles.recipeTime}>⏱ Time: {item.TotalTimeInMins} mins</Text>
      <View style={styles.cardButtons}>
        <TouchableOpacity
          onPress={() => setSelectedRecipe(item)}
          style={styles.showDetailsButton}
        >
          <Text style={styles.buttonText}>🍽 Show Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSave(item)} style={styles.saveButton}>
          <Text style={styles.buttonText}>💾 Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecipeDetails = (recipe: Recipe) => (
    <View style={styles.detailsPage}>
      <ScrollView style={styles.detailsContainer}>
        <Image source={{ uri: recipe["image-url"] }} style={styles.detailsImage} />
        <Text style={styles.detailsTitle}>{recipe.TranslatedRecipeName} 🍲</Text>
        <Text style={styles.detailsTime}>
          ⏱ Total Time: {recipe.TotalTimeInMins} mins
        </Text>
        <Text style={styles.detailsSubtitle}>🌍 Cuisine</Text>
        <Text style={styles.detailsText}>{recipe.Cuisine}</Text>
        <Text style={styles.detailsSubtitle}>🥗 Ingredients</Text>
        <Text style={styles.detailsText}>
          {recipe["Cleaned-Ingredients"]
            .split(",")
            .map((ingredient: string) => `${ingredient.trim()}\n`)}
        </Text>
        <Text style={styles.detailsSubtitle}>📖 Instructions</Text>
        <View style={styles.instructionsContainer}>
          {recipe["TranslatedInstructions"]
            .split("\n")
            .map((step: string, index: number) => (
              <Text key={index} style={styles.detailsText}>• {step.trim()}</Text>
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.backButtonSticky}
        onPress={() => setSelectedRecipe(null)}
      >
        <Text style={styles.backButtonText}>🔙 Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {!selectedRecipe ? (
        <>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Cuisine:</Text>
            <Picker
              selectedValue={selectedCuisine}
              onValueChange={(itemValue) => setSelectedCuisine(itemValue)}
              style={styles.picker}
            >
              {cuisines.map((cuisine, index) => (
                <Picker.Item key={index} label={cuisine} value={cuisine} />
              ))}
            </Picker>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={filteredRecipes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRecipe}
            />
          )}
        </>
      ) : (
        renderRecipeDetails(selectedRecipe)
      )}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Recipe has been saved! ✅</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECEC", 
    padding: 16,
  },
  recipeCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFB6C1", 
    borderRadius: 8,
    backgroundColor: "#FFF5F5", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: "#FFB6C1", 
    borderWidth: 1,
  },
  instructionsContainer: {
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6666",
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 14,
    color: "#555", 
    marginBottom: 8,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showDetailsButton: {
    backgroundColor: "#FF6666", 
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButton: {
    backgroundColor: "#FFA07A", 
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noResults: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#888", 
  },
  cuisineSection: {
    marginBottom: 16,
  },
  cuisineTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6666", 
    marginBottom: 8,
  },
  recipeList: {
    paddingLeft: 8,
  },
  seeMoreButton: {
    backgroundColor: "#FFB6C1", 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  seeMoreButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButtonSticky: {
    position: "absolute",
    bottom: 16,
    left: 16,
    padding: 16,
    backgroundColor: "#FF6666",
    borderRadius: 50,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color : "#D32F2F", 
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#FF6666", 
  },
  picker: {
    height: 60,
    width: "100%",
    backgroundColor: "#FFF5F5", 
    borderColor: "#FFB6C1",
    borderWidth: 1,
    borderRadius: 8,
  },
  detailsPage: {
    flex: 1,
    backgroundColor: "#FFF5F5", 
    padding: 16,
  },
  detailsContainer: {
    flex: 1,
    paddingBottom: 100, 
  },
  detailsImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6666", 
    marginBottom: 8,
  },
  detailsTime: {
    fontSize: 16,
    color: "#888", 
    marginBottom: 16,
  },
  detailsSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6666", 
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    color: "#555", 
    marginBottom: 8,
  },
});

export default App;
