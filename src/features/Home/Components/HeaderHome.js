import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import colors from "../../../config/colors";
import string from "../../../config/string";
import config from "../../../config/config";
import { SearchBar } from "react-native-elements";
import debounce from "lodash.debounce";

function HeaderHome({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSubmit(searchTerm);
  }, [searchTerm]);

  const onSubmit = useCallback(
    debounce((searchTerm) => {
      if (searchTerm !== "") {
        onSearchChange(searchTerm);
      }
    }, 300),
    []
  );

  const handleOnChangeSearch = useCallback(
    (value) => {
      setSearchTerm(value);
    },
    [searchTerm]
  );
  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={styles.searchBox}
        placeholder={string.plh_search_box}
        lightTheme={true}
        round={true}
        onChangeText={(text) => handleOnChangeSearch(text)}
        onClear={(text) => handleOnChangeSearch("")}
        value={searchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: config.width,
    height: config.height * 0.1, //10% height screen

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.white,
  },
  searchBox: {
    width: config.width * 0.9, //80% width screen

    backgroundColor: colors.white,

    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
});

export default HeaderHome;
