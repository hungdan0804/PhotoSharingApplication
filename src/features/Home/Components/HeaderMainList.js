import React, { useState } from "react";
import {
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
import colors from "../../../config/colors";
import config from "../../../config/config";
import MyRenderItemList from "../Components/MyRenderItemList";

function HeaderMainList({
  data,
  handleOnItemClick,
  refreshing,
  onRefresh,
  loading,
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
          if (!loading) {
            return null;
          }
          return (
            <ActivityIndicator
              color={colors.black}
              size={config.height * 0.03}
            />
          );
        }}
        onEndReached={onLoadingMore}
        onEndReachedThreshold={0.3}
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
});

export default HeaderMainList;
