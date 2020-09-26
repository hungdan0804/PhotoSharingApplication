import React from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

function MyItemBackground({ item, animatedItem }) {
  const opacity = animatedItem.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  });

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Animated.Image
          style={[
            { resizeMode: "cover", opacity },
            StyleSheet.absoluteFillObject,
          ]}
          source={{ uri: item.images.regular }}
        />
      </SharedElement>
    </View>
  );
}

const styles = StyleSheet.create({});

export default MyItemBackground;
