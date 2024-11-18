import React, { useState } from 'react';
import { View, Text, FlatList, Image, Button, TextInput, StyleSheet } from 'react-native';
import { useGetImagesQuery } from '../api/pixabayApi';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../features/bookmarks/bookmarksSlice';
import { RootState } from '../redux/store';

export default function HomeScreen() {
  const [query, setQuery] = useState(''); // State untuk pencarian
  const [page, setPage] = useState(1);    // State untuk paginasi
  const { data, isLoading, isFetching } = useGetImagesQuery({ query, page });
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  // Fungsi untuk memuat lebih banyak data
  const loadMore = () => {
    if (!isFetching) setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search images..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => setPage(1)} // Reset ke halaman 1 saat pencarian
      />

      {/* Daftar Gambar */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data?.hits || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.previewURL }} style={styles.image} />
              <Text>{item.user}</Text>
              <Text>{item.tags}</Text>

              {/* Tombol Bookmark */}
              {bookmarks.find((bookmark) => bookmark.id === item.id) ? (
                <Button
                  title="Remove Bookmark"
                  color="red"
                  onPress={() => dispatch(removeBookmark(item.id))}
                />
              ) : (
                <Button
                  title="Add Bookmark"
                  onPress={() => dispatch(addBookmark(item))}
                />
              )}
            </View>
          )}
          onEndReached={loadMore} // Infinite Scroll
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Daftar Bookmark */}
      <View style={styles.bookmarkContainer}>
        <Text style={styles.bookmarkTitle}>Bookmarks:</Text>
        {bookmarks.map((bookmark, idx) => (
          <View key={idx} style={styles.bookmarkItem}>
            <Text>{bookmark.user}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8, borderRadius: 5 },
  imageContainer: { marginBottom: 20, alignItems: 'center' },
  image: { width: 200, height: 200, marginBottom: 5 },
  bookmarkContainer: { marginTop: 20 },
  bookmarkTitle: { fontSize: 18, fontWeight: 'bold' },
  bookmarkItem: { marginVertical: 5 },
});
