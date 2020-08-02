import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { movieApi } from "../api";

export default () => {
  // const [nowPlaying, setNowPlaying] = useState({
  //   movies: [],
  //   error: null,
  // });
  const getData = async () => {
    // try {
    //   const { data: { results } = {} } = await movieApi.nowPlaying();
    //   setNowPlaying({
    //     movies: results,
    //     error: null,
    //   });
    // } catch (error) {
    //   setNowPlaying({
    //     error,
    //   });
    // }
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text>Movies</Text>
    </View>
  );
};
