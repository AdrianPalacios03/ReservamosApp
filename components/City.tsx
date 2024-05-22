import { FlatList, Platform, StyleSheet, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';

import { City as CityProps, Daily } from '@/interfaces/City';
import { Temperature } from '@/components/Temperature';
import { Ionicons } from '@expo/vector-icons';

export const City = ({display, country, weather, pinned = false, onClick}: CityProps) => {

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
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <ThemedText type='defaultSemiBold'>{display}</ThemedText>
                    <ThemedText>{country}</ThemedText>

                </View>

                {
                    // Solo para la web porque detecté bugs en Android y iOS
                    Platform.OS === 'web' &&
                    <Pressable onPress={onClick} style={{flexDirection: 'row', gap: 10}}>
                        <Ionicons name={pinned ? 'pricetag' : 'pricetag-outline'} size={24} color="#fbbc06" />
                        <ThemedText type='defaultSemiBold'>{pinned ? 'Desanclar' : 'Anclar'}</ThemedText>
                    </Pressable>
                }


            </View>
            {
                weather?.daily ?
                    <View style={styles.listContainer}>
                        <FlatList
                            data={weather.daily}
                            horizontal
                            style={styles.flatList}
                            contentContainerStyle={styles.contentContainer}
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
                        <LinearGradient
                            colors={['rgba(0,0,0,0.8)', 'transparent']}
                            style={styles.shadowOverlay}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                        />
                    </View>
                :
                    <ThemedText>Hubo un error al recuperar las temperaturas o no existen en nuestros registros. O hay demasiadas consultas a nuestra API key.</ThemedText>
            }
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    stepContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingBottom: 10,
    },
    listContainer: {
        flex: 1,
    },
    flatList: {
        marginTop: 10,
    },
    contentContainer: {
        paddingRight: 20,
    },
    shadowOverlay: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 60,
    },
})