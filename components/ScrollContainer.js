import React, { useState } from "react";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import PropTypes from "prop-types";

const ScrollContainer = ({
  isLoading,
  children,
  contentContainerStyle,
  onRefreshFn,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshFn();
    setIsRefreshing(false);
  };
  return (
    <ScrollView
      style={{
        backgroundColor: "black",
      }}
      contentContainerStyle={{
        flex: isLoading ? 1 : "auto",
        justifyContent: isLoading ? "center" : "flex-start",
        ...contentContainerStyle,
      }}
      refreshControl={
        <RefreshControl
          tintColor={"white"}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {isLoading ? (
        <ActivityIndicator color="white" size="small"></ActivityIndicator>
      ) : (
        children
      )}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  onRefreshFn: PropTypes.func,
};

export default ScrollContainer;
