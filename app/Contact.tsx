import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const GetInTouch = () => {
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get in Touch</Text>

      <View style={styles.detailContainer}>
        <MaterialIcons name="person" size={24} color="#FF6666" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Labdhi Shah</Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <MaterialIcons name="email" size={24} color="#FF6666" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>labdhi200@gmail.com</Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <MaterialIcons name="location-on" size={24} color="#FF6666" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>Surat, Gujarat</Text>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <MaterialIcons name="phone" size={24} color="#FF6666" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+91 8780891785</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.detailContainer}
        onPress={() => openURL("https://github.com/labdhi02 ")}
      >
        <MaterialIcons name="code" size={24} color="#FF6666" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>GitHub</Text>
          <Text style={styles.value}>See My Projects</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.detailContainer}
        onPress={() => openURL("https:/www.linkedin.com/in/labdhi-shah-8656b4255")}
      >
        <MaterialCommunityIcons name="linkedin" size={24} color="#FF6666" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>LinkedIn</Text>
          <Text style={styles.value}>linkedin.com/in/labdhi-shah</Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 28,
    color: "#FF6666",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFB6C1",
    elevation: 2,
  },
  textGroup: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6666",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default GetInTouch;
