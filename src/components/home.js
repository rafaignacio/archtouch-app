import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import FilmesComponent from './filmes';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Filmes',
    };

    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <FilmesComponent />
        </View>
      );
    }
};

export default HomeScreen;