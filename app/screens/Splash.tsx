import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ConfigsReducer } from '../store/Action/types';
import { Text } from '../components';
import { t } from 'i18n-js';
import { color } from '../theme';
import { RootState } from '../store/Reducer';
import { scaleByDeviceWidth } from '../theme/scalingUtil';
import { StackActions, useNavigation } from '@react-navigation/native';

const Splash = () => {
    const { dispatch } = useNavigation();

    const {
        loggedIn,
        isVerified,
        token
    } = useSelector<RootState>((state) => state.Configs) as ConfigsReducer;


    const LogoFadeIn = useRef(new Animated.Value(0)).current;
    const ButtonsFadeIn = useRef(new Animated.Value(0)).current;

    const AnimatedViewStyle: ViewStyle = {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    }
    const AnimatedOptionsStyle: ViewStyle = {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }

    useEffect(() => {
        Animated.timing(LogoFadeIn, {
            toValue: 1,
            duration: loggedIn ? 2000 : 1000,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(
            () =>
                loggedIn && isVerified
                    ? dispatch(StackActions.replace('authStack', { screen: 'authOptions' }))
                    : Animated.timing(ButtonsFadeIn, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }).start(),
            1000,
        );

        if (token) {
            //   refreshTokenMutation()
            //     .then(({data}) => {
            //       data && dispatch(setToken(data?.refreshToken));
            //     })
            //     .catch((error: ApolloError) => {
            //       // tslint:disable-next-line: no-console
            //       console.log(error);
            //     });
            // }

            // i18n.changeLanguage(language.value);
            // I18nManager.forceRTL(!I18nManager.isRTL && language.isRtl);
            // if (
            //   (!I18nManager.isRTL && language.isRtl) ||
            //   (I18nManager.isRTL && !language.isRtl)
            // ) {
            //   setTimeout(RNRestart.Restart, 0);

            //   return;
        }

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <LinearGradient
                colors={[color.palette.primaryRed, color.palette.lightRed]}
                angle={45}>
                <StyledView>
                    <Animated.View
                        style={[AnimatedViewStyle, { opacity: LogoFadeIn }]}>
                        {/* <Icon name="logo" size={160} color={'#fff'} /> */}
                    </Animated.View>

                    <Animated.View
                        style={[AnimatedOptionsStyle, { opacity: ButtonsFadeIn, }]}>
                        <SkipButton onPress={() => dispatch(StackActions.replace('authStack', { screen: 'authOptions' }))}>
                            <Text
                                style={{ fontSize: scaleByDeviceWidth(18) }} textColor={color.palette.white}>
                                {t('common.skip')}
                            </Text>
                        </SkipButton>
                    </Animated.View>
                </StyledView>
            </LinearGradient>
        </>
    );
};

export default Splash;

const StyledView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SkipButton = styled.TouchableOpacity`
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
