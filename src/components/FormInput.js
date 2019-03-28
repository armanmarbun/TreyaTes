import React, { Component } from 'react';
import {  AppRegistry, Image, View} from 'react-native';
import { Container, Content, Form, Header, Item, Input, Label, Text, Left, Body, Icon, Right, Title, Button,Card, CardItem, } from 'native-base';
import { StackNavigator } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';

import { submitAction } from '../actions/SubmitAction.js';
class FormInput extends Component {
  /*componentDidMount() {
    setTimeout(this.tabs.goToPage.bind(this.tabs, 3));
  }*/
  static navigationOptions =
   {
      title: 'MainActivity',
   };
  state = {
    imageURL: '',
    isDateTimePickerVisible: false,
    pickedDate: '',
    title:'',
    description:'',
    plandate:'',
    month:["January","February","March","April","May","June","July","August","September","October","November","December"],
  };


  _showDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: true });
    }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    var pickedDate = date.getDate() + " " + this.state.month[date.getMonth()] + " " + date.getFullYear() + ", " + this.formatAMPM(date);
    this.setState({plandate : pickedDate});
    this._hideDateTimePicker();
  };
  formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  submitData = () => {
    var data = {
      title: this.state.title,
      description: this.state.description,
      plandate: this.state.plandate
    }
    this.props.submitAction(data);
    this.props.navigation.navigate('Detail')
  }
  getImageAddress = () => {
    fetch('https://124b8d32-5276-4f24-8a6d-c5e2bb6f03f8.mock.pstmn.io/pic', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
        .then((responseJson) => {
          console.log("json",responseJson.interest_picture)
          this.setState({imageURL:responseJson.interest_picture});
        }).catch((error) => {
          console.error(error);
        });
  }
  componentWillMount(){
    this.getImageAddress();
  }
  render() {
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
          <View style={{flex:2, flexDirection:'column'}}>
            <View style={{flex:1}}>
            <Image style={{width: '100%', height: 300}} source={{uri: this.state.imageURL}} />
            </View>

            <Card>
            <Form  style={{flex:1}}>
            <Item floatingLabel style={{marginBottom:15}}>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={title => this.setState({title}) } />
            </Item>
            <Item rounded style={{marginLeft:10,marginRight:10,marginBottom:15}}>
              <Input value={this.state.description} placeholder='Description' onChangeText={description => this.setState({description}) }/>
            </Item>

            <View style={{marginLeft:10,marginRight:10,marginBottom:15}}>
              <Label>Start time</Label>
              <Item  onPress={this._showDateTimePicker}>
                <Input value={this.state.plandate} editable={false} placeholder='Select date'/>
                <Icon active name="arrow-down" />
              </Item>
            </View>
            <View style={{marginBottom:30}}>
            <Button style={{alignSelf:'center',}} onPress = {this.submitData} primary><Text> SUBMIT </Text></Button>
            </View>

              <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
            </Form>

            </Card>
          </View>
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
export default connect(mapStateToProps, {submitAction})(FormInput)
