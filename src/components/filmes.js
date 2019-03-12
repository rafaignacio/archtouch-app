import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

async function getMoviesFromApi() {
    try {
        let response = await fetch(
            'https://facebook.github.io/react-native/movies.json',
        );
        let responseJson = await response.json();

        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}

export default class FilmesComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={ isLoading: true}
    }

    async componentDidMount(){
        return getMoviesFromApi().then((movies) => {
            this.setState({
                isLoading: false,
                dataSource: movies,
            });
        });
    }

    render(){

        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
    
        return(
          <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
              keyExtractor={({id}, index) => id} />
          </View>
        );
      }
}