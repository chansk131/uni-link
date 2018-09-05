import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";

export const Followers = () => (
  <View style = {{
    width: 200,
    height: 30,
    padding: 2,
    backgroundColor: 'white'
    }}>
    <View 
      style = {{
        flexDirection: 'row',
        width: 200,
        height: 30
      }}>
      <View style = {{
        width: 100,
        height: 30,
        backgroundColor: 'white',
        //borderColor: '#ddd',
        borderBottomWidth: 0,
        //shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        shadowOpacity: 0.8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <Text style = {{fontsize: 14}}>100</Text>
        <Text style = {{fontsize: 14}}>Following</Text>
      </View>  
      
      <View style = {{
        width: 100,
        height: 30,
        backgroundColor: 'white',
        //borderColor: '#ddd',
        borderBottomWidth: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        //shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <Text style = {{fontsize: 14}}>100</Text>
        <Text style = {{fontsize: 14}}>Followers</Text>
      </View>  
    
    
    </View>
  </View>  
);
