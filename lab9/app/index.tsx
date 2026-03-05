// Import React hooks
import React, { useEffect, useState, useRef } from "react";

// Import core React Native components
import { View, StyleSheet } from "react-native";

// Import MapView and Marker from react-native-maps
import MapView, { Marker } from "react-native-maps";

// Import Expo Location API to access GPS
import * as Location from "expo-location";


// -----------------------------
// Type Definition
// -----------------------------

// Define a TypeScript type for our coordinates
// This ensures every GPS point has latitude and longitude numbers
type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function App() {

  // -----------------------------
  // STATE
  // -----------------------------

  // route → stores all previous GPS points (the breadcrumb trail)
  const [route, setRoute] = useState<Coordinates[]>([]);

  // mapRef → reference to the MapView
  // Allows us to programmatically move the camera
  const mapRef = useRef<MapView>(null);

  // watchRef → reference to the GPS subscription
  // So we can stop it later (cleanup)
  const watchRef = useRef<Location.LocationSubscription | null>(null);


  // -----------------------------
  // EFFECT → Runs once on mount
  // -----------------------------

  useEffect(() => {

    // Safety flag to prevent state updates after unmount
    let isMounted = true;

    // Async function to start GPS tracking
    const startTracking = async () => {

      // Ask user for location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      // If permission denied → stop
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      // Start watching user's position in real time
      watchRef.current = await Location.watchPositionAsync(
        {
          // High accuracy GPS
          accuracy: Location.Accuracy.High,

          // Update every 4 seconds
          timeInterval: 4000,

          // Or when user moves at least 5 meters
          distanceInterval: 5,
        },

        // This callback runs every time location updates
        (loc) => {

          // If component is unmounted → stop
          if (!isMounted) return;

          // Extract latitude & longitude from GPS data
          const coords: Coordinates = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };

          // Update route (breadcrumb trail)
          setRoute((prev) => {

            // If this is the first point → just add it
            if (prev.length === 0) return [coords];

            // Get last saved point
            const last = prev[prev.length - 1];

            // Calculate small movement difference
            const dx = last.latitude - coords.latitude;
            const dy = last.longitude - coords.longitude;

            // Simple distance formula
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If movement is too small → ignore (GPS noise)
            if (distance < 0.0001) return prev;

            // Add new point to route
            const updated = [...prev, coords];

            // Limit number of stored points (prevents lag)
            if (updated.length > 100) {
              updated.shift(); // Remove oldest point
            }

            return updated;
          });

          // Smoothly move the map camera to follow user
          mapRef.current?.animateToRegion(
            {
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            500 // animation duration in ms
          );
        }
      );
    };

    // Start GPS tracking
    startTracking();


    // -----------------------------
    // CLEANUP FUNCTION
    // Runs when component unmounts
    // -----------------------------
    return () => {
      isMounted = false;

      // Stop watching GPS (VERY IMPORTANT)
      watchRef.current?.remove();
    };

  }, []); // Empty dependency array → runs only once


  // -----------------------------
  // RENDER
  // -----------------------------

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}                 // Attach reference
        style={styles.map}           // Full screen map
        showsUserLocation            // Show blue current location dot
        followsUserLocation          // Auto-follow user
        initialRegion={{             // Starting camera position
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >

        {/* 
          Render a small marker (footstep) 
          for every stored coordinate
        */}
        {route.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            {/* Custom footstep dot */}
            <View style={styles.footstep} />
          </Marker>
        ))}

      </MapView>
    </View>
  );
}


// -----------------------------
// STYLES
// -----------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen
  },

  map: {
    flex: 1, // Map takes full space
  },

  // Small circular dot to represent a footstep
  footstep: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#02162c",
    opacity: 0.8,
  },
});