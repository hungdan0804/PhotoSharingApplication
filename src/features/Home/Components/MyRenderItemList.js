import React, { useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import config from "../../../config/config";
import { SharedElement } from "react-navigation-shared-element";

function MyRenderItemList({ item, index, onItemClick }) {
  const handleOnClick = useCallback(() => {
    onItemClick(item);
  });

  return (
    <TouchableOpacity onPress={handleOnClick}>
      <View style={styles.container}>
        <SharedElement id={`item.${item.key}.photo`} style={styles.thumbnail}>
          <Image style={styles.thumbnail} source={{ uri: item.images.small }} />
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: config.width * 0.4,
    height: config.height * 0.3,

    margin: config.SPACING,
  },
  thumbnail: {
    flex: 1,

    resizeMode: "cover",
    borderRadius: 15,
  },
});

export default MyRenderItemList;
