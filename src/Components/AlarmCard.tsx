import { View, Image, Text, Pressable } from "react-native";
import { useState } from "react";

const Components = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 110,
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "white",
        marginTop: 14,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1.6 / 5,
        }}
      >
        <Image
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 25,
          }}
          source={{
            uri: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
          }}
        />
      </View>
      <View
        style={{
          flex: 3.4 / 5,
          paddingHorizontal: 10,
          justifyContent: "space-between",

          //   backgroundColor: "blue",
        }}
      >
        <View
          style={{
            flex: 1.4 / 3,
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
          >
            22 Miles Away
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
          >
            Loots 2, Tartu
          </Text>
        </View>

        <View
          style={{
            flex: 1.4 / 3,
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "green",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                borderColor: "black",
                width: 70,
              }}
            >
              <Text> 4 miles radius</Text>
            </Pressable>

            <Pressable
              style={{
                width: 70,
                height: 30,
                marginRight: 20,
                backgroundColor: "#000080",
                borderRadius: 20,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "ubuntu",
                  fontSize: 18,
                }}
              >
                Set
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Components;
