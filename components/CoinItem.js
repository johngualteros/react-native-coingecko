import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
const CoinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <Text style={styles.text}>{coin.name}</Text>
        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles.containerPrices}>
        <Text style={styles.symbol}>
          $ {coin.current_price.toLocaleString()}
        </Text>
        <Text
          style={[
            styles.text,
            coin.price_change_percentage_24h > 0
              ? styles.textGreen
              : styles.textRed,
          ]}
        >
          {coin.price_change_percentage_24h} %
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinName: {
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    textAlign: "right",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  symbol: {
    color: "#555",
    marginStart: 5,
    textAlign: "right",
  },
  containerPrices: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textGreen: {
    color: "#359524",
  },
  textRed: {
    color: "#952424",
  },
});
export default CoinItem;
