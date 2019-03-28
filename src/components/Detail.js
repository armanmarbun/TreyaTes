import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Header, Item, Input, Label, Text, Left, Body, Icon, Right, Title, Button,
Card, CardItem, } from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';
class Detail extends Component {
  /*componentDidMount() {
    setTimeout(this.tabs.goToPage.bind(this.tabs, 3));
  }*/
  state = {
    isDateTimePickerVisible: false,
    pickedDate: "",
    month:["January","February","March","April","May","June","July","August","September","October","November","December"],
  };
  static navigationOptions =
   {
      title: 'SecondActivity',
   };
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header noLeft hasTabs>
          <Left/>
          <Body style={{flex:3}}>
          <Title>Treya Tes</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <View>
            <Image style={{width: '100%', height: 300}} source={{uri: 'https://devapi.treya.io/public/city/everything.jpeg'}} />
            </View>
          </View>
          <Card>
            <CardItem style={{flex:2}} header>
              <View style={{flex:1}}><Text>Title</Text><Text style={{fontWeight:"normal"}}>{this.props.title}</Text></View>
              <View style={{flex:1}}><Text>Plan Date</Text><Text style={{fontWeight:"normal"}}>{this.props.plandate}</Text></View>
            </CardItem>
            <CardItem header>
            <View style={{flex:1}}>
                <Text>Description</Text>
                <Text style={{fontWeight:"normal"}}>{this.props.description}</Text>
            </View>
            </CardItem>

            <View style={{marginBottom:30}}>
            <Button style={{alignSelf:'center',}} onPress = {() => navigation.goBack()} primary><Text> BACK </Text></Button>
            </View>
          </Card>
        </Content>
      </Container>
    );
  }
}
function mapStateToProps(state){
    return{
      title:state.title,
      description:state.description,
      plandate:state.plandate,
    }
}
export default connect(mapStateToProps)(Detail)
