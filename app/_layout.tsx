// app/layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#FFD6D6',
            width: 240,
          },
          drawerLabelStyle: {
            color: 'black',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: 'rgb(255, 102, 102)',
          },
          headerTintColor: 'white',
        }}
      >
        
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'FlavourFind',
          }}
        />
        
        <Drawer.Screen
          name="Recipe"
          options={{
            drawerLabel: 'Recipe',
            title: 'Recipe',
          }}
        />

        <Drawer.Screen
          name="SaveRecipe"
          options={{
            drawerLabel: 'Saved Recipe',
            title: 'Saved Recipe',
          }}
        />
        
        <Drawer.Screen
          name="Contact"
          options={{
            drawerLabel: 'Contact',
            title: 'Contact me ',
          }}
        />

        <Drawer.Screen
          name="SearchByIngredients"
          options={{
            drawerLabel: () => null, 
            drawerItemStyle: { display: 'none' }, 
            title: 'Search By Ingredients',
          }}
        />

        <Drawer.Screen
          name="SearchByRecipe"
          options={{
            drawerLabel: () => null, 
            drawerItemStyle: { display: 'none' }, 
            title: 'Search By Recipe Name ',
          }}
        />

        <Drawer.Screen
          name="SearchByCusine"
          options={{
            drawerLabel: () => null, 
            drawerItemStyle: { display: 'none' },
            title: 'Search By Cusine '
          }}
        />

        {/* <Drawer.Screen
          name="SaveRecipe"
          options={{
            drawerLabel: 'SavedRecipe',
            title: 'Savede Recipe',
          }}
        /> */}
        
      </Drawer>
    </GestureHandlerRootView>
  );
}
