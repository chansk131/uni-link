import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Card, Button, SearchBar, Rating } from "react-native-elements";
import { Constants } from "expo";
//import { StarsRating } from "../components/StarRating";

export const Username = () => (
    <View
        style={{
            width: 200,
            height: 85,
            padding: 5,
            backgroundColor: 'white'
        }}>
        <View
            style={{
                flexDirection: 'row',
                width: 200,
                height: 20,
                justifyContent: 'space-between',
            }}>
            <View style={{ width: 100, height: 15, marginBottom: 16 }}>
                <Text
                    style={{ fontSize: 14, color: '#313131' }}>
                    Username
            </Text>
            </View>
            <TouchableOpacity style={{ width: 30, height: 15 }}>
                <Text style={{ fontSize: 10, color: '#868988' }}>EDIT</Text>
            </TouchableOpacity>
        </View>
        <View style = {{
            flexDirection: 'row',
            width: 79,
            height: 16,
         }}>
            <Rating
                imageSize={10}
                readonly
                startingValue={5}
                style={{ paddingVertical: 4 }}
            /> 
            <Text style = {{ fontSize: 14}}>(rating #%)</Text>
        </View>
    <View>
        <Text style={{ fontSize: 14}}>Member since:</Text>
        <Text style={{ fontSize: 14}}>Location:</Text>
    </View>
    </View >
);