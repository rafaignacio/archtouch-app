import React, { Component } from 'react';
import { View, Text, } from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Filmes',
    };

    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Home Screen</Text>
        </View>
      );
    }
};

export default HomeScreen;