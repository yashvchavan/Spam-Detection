import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/notifications/');
        setNotifications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.item, item.is_spam && styles.spamItem]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.message}</Text>
      <Text style={item.is_spam ? styles.spamText : styles.hamText}>
        {item.is_spam ? 'SPAM' : 'NOT SPAM'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  spamItem: {
    backgroundColor: '#ffebee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spamText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
  hamText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default NotificationsScreen;