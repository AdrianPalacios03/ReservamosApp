import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { City as CityProps, Daily } from '@/interfaces/City';
import { Temperature } from '@/components/Temperature';

export const City = ({display, country, lat, long, weather}: CityProps) => {

    const getExtremes = (daily: Daily[]) => {
        if (!daily || daily.length === 0) return { hottest: null, coldest: null };

        let hottest = daily[0];
        let coldest = daily[0];

        daily.forEach(day => {
            if (day.temp.max > hottest.temp.max) hottest = day;
            if (day.temp.min < coldest.temp.min) coldest = day;
        });

        return { hottest, coldest };
    }

    const { hottest, coldest } = weather?.daily ? getExtremes(weather.daily) : { hottest: null, coldest: null };
    
    return (
        <ThemedView style={styles.stepContainer}>
            <ThemedText type='defaultSemiBold'>{display}</ThemedText>
            <ThemedText>{country}</ThemedText>
            {
                weather?.daily 
                ?
                    weather.daily.length > 0 ?
                    <FlatList
                        data={weather.daily}
                        horizontal
                        style={{
                            flex: 1,
                            marginTop: 10,
                        }}
                        contentContainerStyle={{
                            paddingRight: 20
                        }}
                        keyExtractor={item => item.dt.toString()}

                        renderItem={({item, index}) => (
                            <Temperature
                                min={item.temp.min}
                                max={item.temp.max}
                                day={index}
                                hottest={item === hottest}
                                coldest={item === coldest}
                            />
                        )}
                    />

                    : <ThemedText>No hay datos de temperatura para esta ciudad.</ThemedText>
                :
                    <ThemedText>Hubo un error al recuperar las temperaturas o no existen en nuestros registros.</ThemedText>
            }
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    stepContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingBottom: 10,
    }
})