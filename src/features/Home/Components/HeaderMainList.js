import React, { useState } from "react";
import {
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../config/colors";
import config from "../../../config/config";
import string from "../../../config/string";
import MyRenderItemList from "../Components/MyRenderItemList";

function HeaderMainList({
  data,
  handleOnItemClick,
  refreshing,
  onRefresh,

  onLoadingMore,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => {
          return (
            <MyRenderItemList
              item={item}
              index={index}
              onItemClick={handleOnItemClick}
            />
          );
        }}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "center",
        }}
        nestedScrollEnabled={true}
        ListFooterComponent={() => {
          return (
            <TouchableOpacity style={styles.btn_load} onPress={onLoadingMore}>
              <Text style={styles.loadmore}>{string.ic_msg_load_more}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: config.width,
    // height: config.height * 0.9,//90% height screen
    flex: 1,
    backgroundColor: colors.white,
  },
  btn_load: {
    width: config.width * 0.6,
    height: config.height * 0.05,

    borderRadius: 15,

    backgroundColor: colors.opacity,

    alignItems: "center",
    justifyContent: "center",

    margin: config.SPACING,
  },
  loadmore: {
    fontSize: config.height * 0.02,
    color: colors.white,
  },
});

export default HeaderMainList;
