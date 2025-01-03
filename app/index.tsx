import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
    
      <Image
        source={require("../assets/images/homepage.png")}
        style={styles.image}
      />
     
      <Text style={styles.text}>Welcome to FlavourFind</Text>

      <TouchableOpacity style={styles.button}>
        <Link href="/Recipe" style={styles.buttonText}>
        Get Stareted
      </Link>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#FFECEC',
  },
  image: {
    width: 300,
    height: 300, 
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color:"lightcoral",
    fontWeight: "bold",
    
  },
  button: {
    backgroundColor: "#FF6666", 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
