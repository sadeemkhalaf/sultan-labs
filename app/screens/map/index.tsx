import React, { useCallback, useEffect, useState } from "react"
import { ImageRequireSource, Platform, StyleSheet, Image, View, ViewStyle, TouchableHighlightBase, TouchableOpacity } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps" // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "@react-native-community/geolocation"
import { debounce } from "lodash";
import { moderateScale, scaleByDeviceWidth, width } from "../../theme/scalingUtil"
import { color } from "../../theme";
import { LogoFull } from "../../../assets/images/svg";
import { SvgIconButton, Text } from "../../components";
import { fontStyles } from "../../theme/fonts";

const pinIcon = require("../../../assets/images/pin.png") as ImageRequireSource

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerPin: {
    alignItems: 'center',
    backgroundColor: color.palette.white,
    borderRadius: moderateScale(30),
    height: moderateScale(50),
    justifyContent: 'center',
    width: moderateScale(50),
  },
  pin: {
    height: moderateScale(24),
    left: "50%",
    position: "absolute",
    resizeMode: "center",
    top: "50%",
    width: moderateScale(24),
    zIndex: 5,
  }
})

interface Coordinates {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}

const LocationBar: ViewStyle =
{
  position: 'absolute',
  bottom: 56,
  right: 0,
  left: 0,
  width: (width - 48),
  height: scaleByDeviceWidth(120),
  marginHorizontal: scaleByDeviceWidth(24),
  backgroundColor: color.palette.white,
  borderRadius: scaleByDeviceWidth(32),
  shadowOffset: { width: 3, height: 3 },
  shadowColor: color.palette.lightGrey,
  shadowOpacity: 0.2,
  justifyContent: 'flex-start',
  padding: moderateScale(16),
  paddingRight: moderateScale(56)
}


// reference: https://juhanajauhiainen.com/posts/make-custom-marker-displaying-users-location-and-direction

const MapsView = ({ setSelectedLocation, selectedLocation }) => {
  const [geoLocation, setGeoLocation] = useState<Coordinates>({ longitude: 0, latitude: 0 });

  const debounceSetCoordinates = useCallback(debounce(setGeoLocation, 500), [])
  const mapRef = React.useRef(null);


  useEffect(() => {
    Geolocation.getCurrentPosition((geo) =>
      setGeoLocation({ latitude: geo.coords.latitude, longitude: geo.coords.longitude }),
    )
  }, [])

  // {"latitude": 37.785834, "longitude": -122.406417}

  const MarkersLocation = [
    { title: 'Sultan Medica, b1', description: 'Sultan Medica lab, branch 1, Petra Street', coords: { "latitude": 37.791054410463644, "longitude": -122.40705801174043 } },
    { title: 'Sultan Medica, b3', description: 'Sultan Medica lab, branch 3, Al-Madina Al-Monawara Street', coords: { "latitude": 37.78398170324023, "longitude": -122.40793710574508 } }
  ]

  const CIRCLE: ViewStyle = {
    position: 'absolute',
    top: scaleByDeviceWidth(50),
    right: moderateScale(24),
  }


  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: geoLocation.latitude || 37.785834,
          longitude: geoLocation.longitude || -122.406417,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: 37.785834,
          longitude: -122.406417,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChange={(region) => {
          if (Platform.OS === "ios") {
            debounceSetCoordinates({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })
          }
        }}
        onRegionChangeComplete={(region) => {
          if (Platform.OS === "android") {
            setGeoLocation({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })
          }
        }}
        scrollEnabled
        showsUserLocation
        rotateEnabled={true}
        showsIndoorLevelPicker={false}
        userLocationPriority={"high"}
      >
        <View style={LocationBar}>
          <Text style={[fontStyles.bodyTitleBold, { marginBottom: moderateScale(8) }]} textColor={color.palette.black}>{selectedLocation?.title || " "}</Text>
          <Text style={fontStyles.bodyRegular} textColor={color.palette.black}>{selectedLocation?.description || " "}</Text>
          <SvgIconButton type={"next-circle"} fill={color.palette.red.level2} size={20} viewStyle={CIRCLE} />
        </View>

        {MarkersLocation.map((coords, index) =>
          <Marker
            key={index}
            coordinate={coords.coords}
            title={coords.title}
            onPress={() => setSelectedLocation(coords)}
            focusable
            zIndex={100}
          >
            <TouchableOpacity
              style={
                [styles.pin, styles.markerPen]
              }
            >
              <LogoFull height={scaleByDeviceWidth(30)} width={scaleByDeviceWidth(30)} />
            </TouchableOpacity>
          </Marker>
        )}
      </MapView>
      {/* <Image
        source={pinIcon}
        style={[
          styles.pin,
          {
            ...Platform.select({
              android: {
                transform: [{ translateX: -20 }],
              },
              ios: {
                transform: [{ translateX: 5 }],
              },
            }),
          },
        ]}
      /> */}
      <TouchableOpacity
        style={[
          styles.pin,
          {
            ...Platform.select({
              android: {
                transform: [{ translateX: -20 }],
              },
              ios: {
                transform: [{ translateX: 0 }],
              },
            }),
          },
        ]}
      >
        <LogoFull height={scaleByDeviceWidth(30)} width={scaleByDeviceWidth(30)} />
      </TouchableOpacity>
    </>
  )
}

export default MapsView
