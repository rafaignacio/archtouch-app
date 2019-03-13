import React, { Component } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import moment from "moment";

export default class FilmesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      page: 1,
      totalPages: 1
    };
  }

  obterFilmes = async () => {
    const { page, totalPages } = this.state;
    if (this.state.isLoading || totalPages > page) return;

    this.setState({ isLoading: true });

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=1f54bd990f1cdfb230adb312546d765d&page=${page}`
    );
    const movies = await response.json();

    this.setState({
      data: [...this.state.data, ...movies.results],
      page: page + 1,
      isLoading: false
    });
  };

  onPress = () => {};

  renderItem = ({ item }) => {
    const path = `https://image.tmdb.org/t/p/w500${item.poster_path ||
      item.backdrop_path}`;

    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 20,
            paddingRight: 5
          }}
        >
          <View style={{ flex: 0.3 }}>
            <Image
              style={{
                width: 110,
                height: 110,
                resizeMode: "contain"
              }}
              source={{
                uri: path
              }}
            />
          </View>
          <View style={{ flexDirection: "column", flex: 0.9 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                flexWrap: "wrap"
              }}
              ellipsizeMode={"tail"}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              {moment(Date.parse(item.release_date)).format("DD/MM/YYYY")}
            </Text>
            <Text
              style={{
                justifyContent: "center"
              }}
            >
              {item.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  };

  async componentDidMount() {
    this.obterFilmes();
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={({ id }, index) => id.toString()}
        onEndReached={this.obterFilmes}
        onEndReachedThreshold={0.15}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}
