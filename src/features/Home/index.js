import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getRandomImage, getSearchImage } from "../../../api";
import HeaderHome from "../Home/Components/HeaderHome";
import HeaderMainList from "../Home/Components/HeaderMainList";
import { debounce } from "lodash";

const MAX_ITEMS_PER_PAGE = 30;

function index({ navigation }) {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const page = useRef({ num: 1, items: 20 }).current;

  console.log("render");

  const handleOnChangeSearch = useCallback(
    async (searchTerm) => {
      setSearch(searchTerm);
      page.num = 1;
      page.items = 10;
      const data = await getSearchImage(searchTerm, page.num);
      setImages(data);
    },
    [images]
  );

  const handleOnRefresh = useCallback(async () => {
    setRefreshing(true);

    const data = await getRandomImage();
    setImages(data);
    setRefreshing(false);
  }, [images]);

  const handleOnLoadMore = useCallback(async () => {
    console.log("Load More !!!" + images);
    const newData = [...images];
    if (search !== "") {
      console.log("string not null");
      page.num += 1;
      const data = await getSearchImage(search, page);
      const res = newData.concat(...data);
      console.log("data-length: " + res.length);
      setImages(res);
    } else {
      console.log("string null");
      const data = await getRandomImage();
      const res = newData.concat(...data);
      setImages(res);
    }
  }, [images]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomImage();
      setImages(data);
    };
    if (images.length === 0) {
      fetchData();
    }
  }, []);

  const handleOnItemClick = useCallback((item) => {
    navigation.push("Item", { item });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome onSearchChange={handleOnChangeSearch} />
      <HeaderMainList
        data={images}
        handleOnItemClick={handleOnItemClick}
        refreshing={refreshing}
        onRefresh={handleOnRefresh}
        onLoadingMore={handleOnLoadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default index;
