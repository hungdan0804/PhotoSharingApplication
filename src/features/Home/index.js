import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getRandomImage, getSearchImage } from "../../../api";
import HeaderHome from "../Home/Components/HeaderHome";
import HeaderMainList from "../Home/Components/HeaderMainList";
import { debounce } from "lodash";

function index({ navigation }) {
  const [images, setImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ num: 1 });

  const handleOnChangeSearch = useCallback(async (searchTerm) => {
    if (searchTerm !== "") {
      const data = await getSearchImage(searchTerm, page.num);
      setImages(data);
      setSearch(searchTerm);
    }
  }, []);

  const handleOnRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("refresh");

    const data = await getRandomImage();
    setImages(data);
    setRefreshing(false);
  }, [refreshing]);

  const handleOnLoadMore = useCallback(async () => {
    setLoading(true);
    if (search) {
      setPage(++page.num);
      const data = await getSearchImage(search, page.num);
      setImages(data);
    } else {
      const data = await getRandomImage();
      const newData = [...images, ...data];
      setImages(newData);
    }
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomImage();
      setImages(data);
    };
    if (images.length === 0) {
      const res = fetchData();
    }
  }, [images]);

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
        loading={loading}
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
