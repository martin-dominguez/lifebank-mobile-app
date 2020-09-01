import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager,ScrollView} from "react-native";
import { Icon, Card } from 'react-native-elements';
import NumberFormat from '../components/NumberFormat';

import styles from '../styles/main';
import { colors } from '../styles/values';
import lifeStyles from '../styles/lifebank';
import ContentSet from './ContentSet';
import { SafeAreaView } from 'react-navigation';

export default class HomeCard extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    // Render functions

    renderValue = (value) => {

        return (
            <View
                style={{
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 10,
                }}
            >
                <Text
                    style={{
                        color: '#333',
                        fontSize: 16,
                        fontWeight: "bold",
                        marginLeft: 5,
                    }}
                >
                    {
                        value &&
                        typeof value !== 'undefined' &&
                        (<NumberFormat value={value} format='EU' thousandSeparator={true} sufix={' €'} />)
                    }
                </Text>
            </View>
        );
    };

    renderSubCards = (item) => {
        if (item.id === 'accounts') {
            return this.props.data.items.map((card, index) => {
                const { label, iban, balance} = card;
    
    
                return (
                    <TouchableOpacity 
                        key={index}  
                        onPress={()=>this.props.navigation.navigate('AccountHistory', {
                            ...card,
                        })}
                    >
                        <Card title={
                            <View style={
                                {
                                    display: "flex",
                                    flexDirection: "row",
                                    borderBottomColor: "#EEE",
                                    borderBottomWidth: 1,
                                    paddingBottom: 10,
                                }
                            }>
                                <Text style={{textTransform: "uppercase", fontSize: 16}}>{label}</Text>
                                <View style={{flex: 1}}>
                                    <Text style={
                                        {
                                            textAlign: 'right',
                                            fontSize: 16,
                                            color: colors.primary
                                        }
                                    }>
                                    
                                    {
                                        balance &&
                                        typeof balance !== 'undefined' &&
                                        (<NumberFormat value={balance} format='EU' thousandSeparator={true} sufix={' €'} />)
                                    }
                                    </Text>
                                </View>
                            </View>
                        }>
                            <View style={[styles.pt1]}>
                                <Text style={
                                    {
                                        color: "#AAA",
                                        fontStyle: "italic"
                                    }
                                }>
                                    {iban}
                                </Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )
            });
        } else if (item.id === 'mylife') {
            return (
                <ContentSet contentSetId={item.contentSetId} navigation={this.props.navigation}/>
            )
        }
    }

    renderCard = () => {
        const {name, icon, iconType, value} = this.props.data;

        return (
            <>
                <TouchableOpacity onPress={()=>this._toggleExpand()}>
                    <View
                        style={[lifeStyles.menuCard]}
                    >
                            <View style={
                                { 
                                    flex: 2,
                                    flexDirection: 'row',
                                    alignItems: 'center' 
                                }
                            }>
                                {iconType === 'icon' &&
                                    <View style={[styles.ml2]}>
                                        <Icon name={icon} type="ionicon" color={colors.primary} size={24} /> 
                                    </View>
                                }
                                {iconType === 'image' &&
                                    <View style={[styles.ml2]}>
                                        <Image
                                            source={require('../assets/icon.png')} //TODO - Cambiar esto!
                                            style={[lifeStyles.logoImage]}
                                        />
                                    </View>

                                }
                                <Text style={[styles.ml2, {fontSize: 18, color: "#888"}]}>
                                    {name}
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
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: 10,
                                        }}
                                    >
                                        <Icon 
                                            name={this.state.expanded ? 'ios-arrow-up' : 'ios-arrow-down'} 
                                            type="ionicon" 
                                            size={16} 
                                            color={colors.primary}
                                        />
                                </View>
                            </View>    
                    </View>
                </TouchableOpacity>
                    {
                        this.state.expanded && 
                            <SafeAreaView style={[styles.mb2]}>
                                {this.renderSubCards(this.props.data)}
                            </SafeAreaView>
                    }
            </>
        );
    };
  
    render() {
        return this.renderCard()
    }

    // Action functions 
    _onClick = (index) => {
        const temp = state.data.slice()
        temp[index].value = !temp[index].value
        this.setState({data: temp})
    }

    _toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
    }
}
