import React, {Component} from "react"
import {View, Text, StyleSheet} from "react-native"
import {Root, Container, Header, Left, Body, Right, Title, Thumbnail, Drawer, Button, Icon} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"
import SideBar from "../components/SideBar"

const BASE_URL = "http://192.168.12.188:3000/api/v1/method"

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props)
    this.state = {
      dataSource: {},
      roleInfo: {},
      teamInfo: {},
      levelInfo: {},
      token: ""
    };
  }

  async componentDidMount(){
    await AsyncStorage.getItem("token", (error, result) => {
      this.setState({
        token: result
      })      
    })

    this.requestProfileApi()
  }

  render(){
    const {replace} = this.props.navigation
    return(
      <Root>
        <Drawer ref={(ref) => {this.drawer = ref}} content={<SideBar
          roleDescription={this.state.roleInfo.description}
          teamName={this.state.teamInfo.name}
          teamDescription={this.state.teamInfo.description}
          levelName={this.state.levelInfo.name}
          levelCategory={this.state.levelInfo.category}
          levelDescription={this.state.levelInfo.description}
          levelCountDown={this.state.levelInfo.countdown}
          nav={replace}
        />}>
          <View style={styles.container}>
            <Header>
              <Left>
                <Button transparent onPress={() => this.drawer._root.open()}>
                  <Icon type="Entypo" name="menu" />
                </Button>
              </Left>
              <Body>
                <Text style={styles.title}>MY PROFILE</Text>
              </Body>
              <Right />
            </Header>
            <View style={[styles.alignCenter, {marginTop: 18}]}>
              <Thumbnail style={{ width: 125, height: 125 }} source={{uri: "https://ui-avatars.com/api/?name=John+Doe&size=512"}} />
              <Text style={{ marginTop: 4 }}>{this.state.dataSource.username}</Text>
              <Text style={{ fontSize: 24, marginTop: 8, fontWeight: "bold" }}>{this.state.dataSource.fullname}</Text>
              <Text style={{ fontSize: 16 }}>{this.state.dataSource.email}</Text>
            </View>
          </View>
        </Drawer>
      </Root>
    )
  }

  requestProfileApi(){
    // console.log(this.state.token)
    fetch(BASE_URL + "/profile", {
      method: "GET",
      headers:{
        "Authorization" : "jwt " + this.state.token
      }
    })
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({
        dataSource: resJson,
        roleInfo: resJson.roleInfo,
        teamInfo: resJson.teamInfo,
        levelInfo: resJson.levelInfo,
      })
      console.log(this.state.roleInfo)
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alignCenter: {
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  }
})

export default HomeScreen