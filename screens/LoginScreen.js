import React, {Component} from "react"
import {View, TouchableOpacity} from "react-native"
import {
  Root,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Toast,
  Text,
  Spinner
} from "native-base"
import AsyncStorage from "@react-native-community/async-storage"

const BASE_URL = "http://192.168.12.188:3000/api/v1/method"

class LoginScreen extends Component {
  
  static navigationOptions = {
    title: 'Login to continue',
  };

  constructor(props){
    super(props)
    this.state = {
      isLoading : false,
      username: "",
      password: ""
    }
  }

  async componentDidMount(){
    // const retrievedItem =  await AsyncStorage.getItem("token")
    // const item = JSON.parse(retrievedItem);
    // console.log(AsyncStorage.getItem("token"))
    // AsyncStorage.getItem("token", (error, result) => {
    //   console.log("from AsyncStorage : " + result)
    // })
    // .then((res) => {
    //   this.props.navigation.navigate("Home")
    // })

    await AsyncStorage.getItem("token", (error, result) => {
      if (result) {
          this.props.navigation.replace("Home")
      } 
    })
  }

  render(){
    const {navigate} = this.props.navigation

    const spinner = (
      <Spinner color='blue' style={{ marginTop: 24 }} />
    )
    const buttonSign = (
      <Button rounded block style={{ marginTop: 24, backgroundColor: "#3465A4" }} onPress={() => this.requestLoginToApi()}>
        <Text style={{ color: "#fff" }}>Sign In</Text>
      </Button>
    )

    return(
      <Root>
        <View style={{ flex:1, alignItems: "center", justifyContent: "center", paddingRight: 12, paddingLeft: 12 }}>
          <Text style={{ fontSize: 24, color: "#2E3436" }}>Sign in to </Text>
          <Text style={{ fontSize: 36, color: "#3465A4", marginBottom: 32, fontWeight: "bold" }}>Labstack</Text>

          <Item rounded>
            <Icon active type="MaterialIcons" name='email' style={{ color: "#3465A4" }} />
            <Input placeholder='jhondoe' onChangeText={(text) => this.setState({ username:text })}/>
          </Item>
          <Item rounded style={{ marginTop: 12 }}>
            <Icon active type="MaterialCommunityIcons" name='onepassword' style={{ color: "#3465A4" }} />
            <Input placeholder='*******' onChangeText={(text) => this.setState({ password:text })}/>
          </Item>
          {this.state.isLoading ? spinner : buttonSign}
        </View>
      </Root>
    )
  }

  requestLoginToApi(){
    this.setState({isLoading:true})

    fetch(BASE_URL + "/auth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((res) => res.json())
    .then((resJson) => {
      // console.log(resJson)
      
      if (typeof resJson.token === "undefined") {
        Toast.show({
          text: resJson.message,
          buttonText: "Okay",
          duration: 3000
        })
      }else{
        // console.log(resJson.token)
        AsyncStorage.setItem("token", resJson.token)
        this.props.navigation.replace("Home")
      }

      // AsyncStorage.getItem("token", (error, result) => {
      //   console.log("from AsyncStorage : " + result)
      // })

      this.setState({isLoading:false})
    })
  }
}


export default LoginScreen