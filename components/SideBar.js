import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"
import {Container, Content, Button} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"

class SideBar extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <Container>
        <Content>
          <View style={{ padding:12 }}>
            <Text style={ [styles.title, {marginTop: 12}] }>ROLE INFO</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
              <Text style={styles.subTitle}>Description</Text>
              <Text style={styles.subTitle}>{this.props.roleDescription}</Text>
            </View>
            <Text style={ [styles.title, {marginTop: 12}] }>TEAM INFO</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
              <Text style={styles.subTitle}>Name</Text>
              <Text style={styles.subTitle}>{this.props.teamName}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.subTitle}>Description</Text>
              <Text style={styles.subTitle}>{this.props.teamDescription}</Text>
            </View>
            <Text style={ [styles.title, {marginTop: 22}] }>LEVEL INFO</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
              <Text style={styles.subTitle}>Name</Text>
              <Text style={styles.subTitle}>{this.props.levelName}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.subTitle}>Category</Text>
              <Text style={styles.subTitle}>{this.props.levelCategory}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.subTitle}>Description</Text>
              <Text style={styles.subTitle}>{this.props.levelDescription}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.subTitle}>CountDown</Text>
              <Text style={styles.subTitle}>{this.props.levelCountDown}</Text>
            </View>
            <Button danger full rounded style={{ marginTop: 18 }} onPress={() => this.logout()}>
              <Text style={{ color:"#fff" }}>LOGOUT</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }

  async logout(){
    await AsyncStorage.removeItem("token", (error, result) => {
      this.props.nav("Login")
    })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16
  }
})

export default SideBar