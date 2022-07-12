import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import CoinItem from "./components/CoinItem";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const getData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();
    setCoins(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Market</Text>
        <TextInput
          style={styles.input}
          placeholder="Search Coin"
          placeholderTextColor="#b5b5b5"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          coins.filter(coin=>coin.name.toLowerCase().includes(text.toLowerCase())
          ||coin.symbol.toLowerCase().includes(text.toLowerCase()))
        }
        renderItem={({ item }) => <CoinItem coin={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async()=>{
          setRefreshing(true);
          await getData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    width: "90%",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    alignItems: "center",
  },
  input: {
    width: "40%",
    height: 30,
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
});
export default App;
