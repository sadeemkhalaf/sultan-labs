import React, { useCallback, useEffect, useState } from "react"
import { ImageRequireSource, Platform, StyleSheet, Image } from "react-native"
import MapView, { Camera, PROVIDER_GOOGLE } from "react-native-maps" // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from "@react-native-community/geolocation"
import { debounce } from "lodash"
import { moderateScale } from "../../theme/scalingUtil"

const pinIcon = require("../../../assets/images/pin.png") as ImageRequireSource

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 5,
    height: moderateScale(24),
    width: moderateScale(24),
    resizeMode: "center",
  },
})

interface Coordinates {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}

// reference: https://juhanajauhiainen.com/posts/make-custom-marker-displaying-users-location-and-direction

const MapsView = () => {
  const [geoLocation, setGeoLocation] = useState<Coordinates>({ longitude: 0, latitude: 0 })
  const debounceSetCoordinates = useCallback(debounce(setGeoLocation, 500), [])
  const [cameraHeading, setCameraHeading] = React.useState(0)
  const mapRef = React.useRef(null);

  function updateCameraHeading() {
    const map = mapRef.current
    map.getCamera().then((info: Camera) => {
      setCameraHeading(info.heading)
    })
  }

  useEffect(() => {
    Geolocation.getCurrentPosition((info) =>
      setGeoLocation({ latitude: info.coords.latitude, longitude: info.coords.longitude }),
    )
  }, [])

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
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

        ref={mapRef}
        onTouchEnd={() => {
          updateCameraHeading();
        }}
        onTouchCancel={() => {
          updateCameraHeading();
        }}
        onTouchStart={() => {
          updateCameraHeading();
        }}
        onTouchMove={() => {
          updateCameraHeading();
        }}
      ></MapView>
      {/* <Car fill="black" /> */}

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
