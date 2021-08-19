import React, { useCallback, useEffect, useState } from "react"
import { ImageRequireSource, Platform, StyleSheet, Image, View, ViewStyle } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps" // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "@react-native-community/geolocation"
import { debounce } from "lodash";
import { moderateScale, scaleByDeviceWidth, width } from "../../theme/scalingUtil"
import { color } from "../../theme";

const pinIcon = require("../../../assets/images/pin.png") as ImageRequireSource

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    height: moderateScale(24),
    left: "50%",
    position: "absolute",
    resizeMode: "center",
    top: "50%",
    width: moderateScale(24),
    zIndex: 5,
  },
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
}


// reference: https://juhanajauhiainen.com/posts/make-custom-marker-displaying-users-location-and-direction

const MapsView = () => {
  const [geoLocation, setGeoLocation] = useState<Coordinates>({ longitude: 0, latitude: 0 })
  const debounceSetCoordinates = useCallback(debounce(setGeoLocation, 500), [])
  const mapRef = React.useRef(null);


  useEffect(() => {
    Geolocation.getCurrentPosition((geo) =>
      setGeoLocation({ latitude: geo.coords.latitude, longitude: geo.coords.longitude }),
    )
  }, [])



  // {"latitude": 37.785834, "longitude": -122.406417}

  const MarkersLocation = [
    { "latitude": 37.791054410463644, "longitude": -122.40705801174043 },
    { "latitude": 37.78398170324023, "longitude": -122.40793710574508 }
  ]


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
        <View style={LocationBar}></View>
        {MarkersLocation.map((coords, index) =>
          <Marker
            key={index}
            coordinate={coords}
            title={'MedLab'}
            description={'Medlab Jordan'}

          />
        )}
      </MapView>
      <Image
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
      />
    </>
  )
}

export default MapsView
