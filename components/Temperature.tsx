import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { TemperatureProps } from "@/interfaces/ComponentProps"
import { Ionicons } from '@expo/vector-icons';

export const Temperature = ({min, max, day, coldest = false, hottest = false}: TemperatureProps) => {
    return (
        <ThemedView style={[
            styles.container,
            {backgroundColor: hottest ? '#edab93' : coldest ? '#93d6ed' : '#aad971'}
        ]}>
            {
                coldest 
                ? 
                    <View style={styles.highlight}>
                        <ThemedText style={[styles.text, styles.small]} type="defaultSemiBold">
                            <Ionicons name="snow" size={12} color="black" />
                            Más frío
                        </ThemedText>
                    </View>
                : hottest ? 
                    <View style={styles.highlight}>
                        <ThemedText style={[styles.text, styles.small]} type="defaultSemiBold">
                            <Ionicons name="flame" size={12} color="black" />
                            Más caliente
                        </ThemedText>
                    </View>
                : null
            }
            <ThemedText style={styles.text} type="defaultSemiBold">
                <Ionicons name="thermometer-outline" size={16} color="black" />
                Min: {min}
            </ThemedText>
            <ThemedText style={styles.text}  type="defaultSemiBold">
                <Ionicons name="thermometer-outline" size={16} color="black" />
                Max: {max}
            </ThemedText>
            <ThemedText style={[styles.text,styles.day]}  type="defaultSemiBold">
                {
                    day === 0 ? 'Hoy' 
                    : day === 1 ? 'Mañana'
                    : `En ${day + 1} días`
                }
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,
        gap: 10,
        position: 'relative'
    },
    text: {
        color: 'black',
        fontSize: 16
    },
    day: {
        fontSize: 18,
        color: '#141414'
    },
    highlight: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#e3e3e3',
        paddingHorizontal: 5,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    small: {
        fontSize: 12
    }
})