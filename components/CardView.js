import React, {Component} from "react"
import {View, StyleSheet, Text} from "react-native"

class CardView extends Component {
  render(){
    return(
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{this.props.title}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text>{this.props.content}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 6,
    elevation: 4,
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  cardHeader: {
    padding: 12
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  cardBody: {
    padding: 12
  }
})

export default CardView