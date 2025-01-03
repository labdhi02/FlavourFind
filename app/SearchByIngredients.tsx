import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const recipes = require("../constant/Cleaned_Indian_Food_Dataset (1).json");

type Recipe = {
  TranslatedRecipeName: string;
  "Cleaned-Ingredients": string;
  TotalTimeInMins: number;
  Cuisine: string;
  TranslatedInstructions: string;
  "image-url": string;
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredRecipes([]);
      } else {
        const searchIngredients = searchQuery
          .split(",")
          .map((ingredient) => ingredient.trim().toLowerCase());

        const results = recipes.filter((recipe: Recipe) => {
          const recipeIngredients = recipe["Cleaned-Ingredients"]
            .split(",")
            .map((ingredient) => ingredient.trim().toLowerCase());

          return searchIngredients.every((ingredient) =>
            recipeIngredients.some((recipeIngredient) =>
              recipeIngredient.includes(ingredient)
            )
          );
        });

        setFilteredRecipes(results);
      }
      setIsLoading(false);
      setSelectedRecipe(null);
    }, 1000);
  };

  const handleSave = async (recipe: Recipe) => {
    try {
      const savedRecipes = await AsyncStorage.getItem("savedRecipes");
      const parsedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];
      parsedRecipes.push(recipe);

      await AsyncStorage.setItem("savedRecipes", JSON.stringify(parsedRecipes));

      // Show modal
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
          <TextInput
            style={styles.input}
            placeholder="Enter ingredients separated by commas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍 Search</Text>
          </TouchableOpacity>

          {isLoading ? (
            <ActivityIndicator size="large" color="#FF6666" style={styles.loader} />
          ) : (
            <FlatList
              data={filteredRecipes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRecipe}
            />
          )}

          {filteredRecipes.length === 0 && !isLoading && (
            <Text style={styles.noResults}>No recipes found 😔</Text>
          )}

          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Recipe has been saved! ✅</Text>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        renderRecipeDetails(selectedRecipe)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECEC",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB6C1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#FF6666",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recipeCard: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 8,
    backgroundColor: "#FFF5F5",
    elevation: 2,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
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
  saveMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 10,
  },
  instructionsContainer: {
    marginBottom: 16,
  },
  noResults: {
    textAlign: "center",
    marginBottom: 450,
    fontSize: 25,
    color: "#FF6666",
  },
  detailsPage: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  detailsImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF6666",
    marginBottom: 16,
  },
  detailsTime: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  detailsSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FF6666",
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  backButtonSticky: {
    width: "100%",
    backgroundColor: "#FF6666",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",  
  },
 
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", 
  },
  loader: {
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: "#D32F2F", 
  },
});

export default App;
function setModalVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}

