import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import config from "../../../config/config";
import string from "../../../config/string";
import colors from "../../../config/colors";
import { uppercaseFirst } from "../../../config/stringHelper";

function MyItemBottomSheet({ item, animatedItem }) {
  const opacity = animatedItem.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={{ ...styles.bottomSheetContainer, opacity }}>
      <Text style={styles.title}>
        {item.title ? uppercaseFirst(item.title) : "No caption"}
      </Text>
      <View style={styles.lineContainer}>
        <View style={styles.itemContainer}>
          <MaterialCommunityIcons
            name={string.ic_name_camera}
            color={colors.white}
            size={config.height * 0.02}
          />
          <Text style={{ ...styles.itemValue }}>{item.user.name}</Text>
        </View>
        <View style={styles.rating}>
          <View style={styles.itemContainer}>
            <MaterialCommunityIcons
              name={string.ic_name_fire}
              color={colors.white}
              size={config.height * 0.02}
            />
            <Text style={styles.itemValue}>{item.likes}</Text>
          </View>
          <View style={styles.itemContainer}>
            <MaterialCommunityIcons
              name={string.ic_name_download}
              color={colors.white}
              size={config.height * 0.02}
            />
            <Text style={styles.itemValue}>{item.downloads}</Text>
          </View>
        </View>
      </View>
      {/* check Location*/}
      {item.location.name && (
        <View style={styles.lineContainer}>
          <View style={styles.itemContainer}>
            <MaterialCommunityIcons
              name={string.ic_name_map_marker}
              color={colors.white}
              size={config.height * 0.02}
            />
            <Text style={styles.itemValue}>{item.location.name}</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: config.width,
    height: config.height * 0.3,

    alignItems: "center",
  },
  lineContainer: {
    width: "80%", //80% parent
    height: "18%", //18% parent

    flexDirection: "row",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",

    alignItems: "center",
  },
  rating: {
    flex: 1,
    flexDirection: "row",
  },
  itemValue: {
    color: colors.white,

    fontWeight: "bold",
    fontSize: config.height * 0.015,

    marginLeft: config.SPACING / 2,
    textAlign: "center",

    overflow: "hidden",
  },
  title: {
    width: "80%", //80% parent

    color: colors.white,
    fontSize: config.height * 0.03,
    textAlign: "left",
    fontWeight: "bold",

    overflow: "hidden",
  },
});

export default MyItemBottomSheet;
