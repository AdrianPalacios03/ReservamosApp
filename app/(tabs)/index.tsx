import { ActivityIndicator, Image, StyleSheet } from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

import { City as CityType } from '@/interfaces/City';
import { useWeather } from '@/hooks/useWeather';
import { City } from '@/components/City';

export default function HomeScreen() {

  const [cityValue, setCityValue] = useState('');
  const [pinnedCities, setPinnedCities] = useState<CityType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getCity } = useWeather();

  const searchCity = async () => {
    setIsLoading(true);
    const data = await getCity(cityValue);
    setCities(data);
    setIsLoading(false);
  }


  return (
    <GestureHandlerRootView>
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/assets/images/reservamos-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">¡Bienvenido a Reservamos!</ThemedText>
          <HelloWave/>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">¿A dónde vamos?</ThemedText>
          <TextInput 
            placeholder="Buscar" 
            value={cityValue}
            onChangeText={setCityValue}
            style={styles.textInput}
            onSubmitEditing={searchCity}
            placeholderTextColor="#f5f5f5" 
          />
        </ThemedView>

        {
          pinnedCities.map((city) => (
            <City
              key={city.id}
              display={city.display}
              country={city.country}
              lat={city.lat}
              long={city.long}
              weather={city.weather}
              pinned
              onClick={() => {setPinnedCities(pinnedCities.filter((c) => c.id !== city.id))}}
            />
          ))
        }

        {
          isLoading ? 
          <ActivityIndicator size="large"/>
          :
          cities.map((city) => (
            <City
              key={city.id}
              display={city.display}
              country={city.country}
              lat={city.lat}
              long={city.long}
              weather={city.weather}
              onClick={() => {setPinnedCities([...pinnedCities, city])}}
            />
          ))
        }
      </ParallaxScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textInput: {
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 8,
    color: 'white',
    padding: 8,
    marginTop: 8,
  }
});
