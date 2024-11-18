import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useGetImagesQuery } from '../api/pixabayApi';

export default function HomeScreen() {
  const [query, setQuery] = useState('nature');
  const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const { data, isFetching, isError } = useGetImagesQuery({ query, page });

  const handleLoadMore = () => {
    if (!isFetching && data?.hits?.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    setPage(1); // Reset ke halaman pertama
  };

  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((item) => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.webformatURL }} style={styles.image} />
      <Text style={styles.text}>User: {item.user}</Text>
      <Text style={styles.text}>Tags: {item.tags}</Text>
      <TouchableOpacity
        onPress={() => toggleBookmark(item.id)}
        style={[
          styles.bookmarkButton,
          bookmarked.includes(item.id) && styles.bookmarked,
        ]}
      >
        <Text style={styles.bookmarkText}>
          {bookmarked.includes(item.id) ? 'Unbookmark' : 'Bookmark'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search images..."
        onChangeText={handleSearch}
        value={query}
      />
      {isError && <Text style={styles.error}>Error fetching images</Text>}
      <FlatList
        data={data?.hits || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <Text>Loading...</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  image: { width: '100%', height: 200 },
  text: { marginTop: 5 },
  bookmarkButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 5,
  },
  bookmarked: { backgroundColor: '#ffd700' },
  bookmarkText: { fontWeight: 'bold' },
  error: { color: 'red', textAlign: 'center', marginVertical: 10 },
});
