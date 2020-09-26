import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Animated, Text } from "react-native";
import colors from "../../../config/colors";
import MyItemBackground from "../Components/MyItemBackground";
import MyItemBottomSheet from "../Components/MyItemBottomSheet";

function ItemScreen({ route, navigation }) {
  const item = route.params.item;
  const opaAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opaAnimated, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(opaAnimated).stop;
    };
  }, []);

  return (
    <Animated.View style={styles.container}>
      <MyItemBackground item={item} animatedItem={opaAnimated} />
      <MyItemBottomSheet item={item} animatedItem={opaAnimated} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "flex-end",
    backgroundColor: colors.black,
  },
});

export default ItemScreen;
