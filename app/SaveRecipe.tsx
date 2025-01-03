import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Recipe interface
interface Recipe {
  "image-url": string;
  TranslatedRecipeName: string;
  TotalTimeInMins: number;
  Cuisine: string;
  "Cleaned-Ingredients": string;
  "TranslatedInstructions": string;
  "Preparation-Time"?: string;
}

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Fetch saved recipes from AsyncStorage when the page loads
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const savedRecipesData = await AsyncStorage.getItem("savedRecipes");
        if (savedRecipesData) {
          setSavedRecipes(JSON.parse(savedRecipesData));
        }
      } catch (error) {
        console.error("Error fetching saved recipes", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Handle delete action
  const handleDelete = async (index: number) => {
    try {
      const updatedRecipes = [...savedRecipes];
      updatedRecipes.splice(index, 1); // Remove the recipe at the given index
      await AsyncStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe", error);
    }
  };

  // Render details of a selected recipe
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

  // Render saved recipe card
  const renderRecipe = ({ item, index }: { item: Recipe; index: number }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item["image-url"] }} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.TranslatedRecipeName}</Text>
      <Text style={styles.recipeTime}>⏱ Time: {item["Preparation-Time"] || "N/A"}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => setSelectedRecipe(item)}
        >
          <Text style={styles.buttonText}>🍽 Show Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRemoveText}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.buttonRemoveText}>❌ Remove Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedRecipe ? (
        renderRecipeDetails(selectedRecipe) // Display details page
      ) : (
        <>
          <Text style={styles.title}>Saved Recipes</Text>
          {savedRecipes.length === 0 ? (
            <Text style={styles.noRecipes}>No recipes saved yet! 😔</Text>
          ) : (
            <FlatList
              data={savedRecipes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRecipe}
            />
          )}
        </>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6666",
    marginBottom: 16,
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
    marginBottom: 8,
  },
  recipeTime: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailButton: {
    backgroundColor: "#FF6666",
    padding: 8,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#FF4040",
    padding: 8,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noRecipes: {
    fontSize: 20,
     color:  "#FF6666",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 200,

  },
  buttonRemoveText: {
    backgroundColor: "#FFA07A",
    padding: 5,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  // Details Page styles
  detailsPage: {
    flex: 1,
    backgroundColor: "#FFECEC",
    padding: 16,
  },
  detailsContainer: {
    flex: 1,
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
  instructionsContainer: {
    marginBottom: 16,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // Ensures the text is centered within the button
  },
});

export default SavedRecipesPage;
