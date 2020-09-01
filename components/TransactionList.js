import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Icon } from 'react-native-elements';


export default class TransactionList extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
        }
    }

    renderValue = (value) => {
        const positive = value.includes('-');
        if (positive) {
          return (
            <View
              style={{
                backgroundColor: 'rgba(220,230,218,1)',
                width: 70,
                height: 28,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 10,
              }}
            >
              <Icon name="md-arrow-dropup" type="ionicon" color="green" size={25} />
              <Text
                style={{
                  color: 'green',
                  fontFamily: 'regular',
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                {value}
              </Text>
            </View>
          );
        } else {
          return (
            <View
              style={{
                backgroundColor: 'rgba(244,230,224,1)',
                width: 70,
                height: 28,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 10,
              }}
            >
              <Icon name="md-arrow-dropdown" type="ionicon" color="red" size={25} />
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'regular',
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                {value}
              </Text>
            </View>
          );
        }
      }

    renderCard = (item, index) => {
        const { date, description, value, newBalance } = item;

        console.log(date, description, value, newBalance);
    
        return (
          <View
            key={index}
            style={{
              height: 60,
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: '#333',
              borderRadius: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: '#888',
                }}
              >
                { description === 'undefined' ? "-" : description }
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              {this.renderValue(value)}
              <View
                style={{
                  backgroundColor: 'rgba(222,222,222,1)',
                  width: 35,
                  height: 28,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}
              >
                <Text>{newBalance}</Text>
              </View>
            </View>
          </View>
        );
    }

    render() {
        return this.props.data.items.map((item, index) => {
            this.renderCard(item, index);
        })
    }
}