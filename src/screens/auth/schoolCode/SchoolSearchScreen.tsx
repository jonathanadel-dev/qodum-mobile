import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../navigation/AuthStack';

import Header from '../../../components/Header';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import { searchSchools, SchoolType } from '../../../lib/api/schoolApi';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'SchoolSearch'>;


// School search screen
export default function SchoolSearchScreen({ navigation, route }: Props) {
    
    // State
    const { onSelect } = route.params;
    const [query, setQuery] = useState('');
    const [allSchools, setAllSchools] = useState<SchoolType[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);


    // Fetch school
    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setLoadError(false);
            try {
                const schools = await searchSchools('');
                if (!cancelled) setAllSchools(schools);
            } catch {
                if (!cancelled) setLoadError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);


    // School results
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return allSchools;
        return allSchools.filter(
            (school) =>
                school.name.toLowerCase().includes(q) ||
                school.code.toLowerCase().includes(q),
        );
    }, [query, allSchools]);


    // Handling select
    const handleSelect = (school: SchoolType) => {
        onSelect(school);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Find Your School or College" />

            <View style={styles.body}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search school name or code"
                        placeholderTextColor={colors.hash}
                        style={styles.searchInput}
                    />
                </View>

                {loading ? (
                    <View style={styles.centerState}>
                        <ActivityIndicator size="small" color={colors.primary} />
                    </View>
                ) : loadError ? (
                    <View style={styles.centerState}>
                        <Text style={styles.stateText}>
                            Couldn't load schools. Pull down to try again.
                        </Text>
                    </View>
                ) : results.length === 0 ? (
                    <View style={styles.centerState}>
                        <Text style={styles.stateText}>
                            No schools found. Try a different name.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        ItemSeparatorComponent={() => <View style={styles.divider} />}
                        renderItem={({ item, index }) => (
                            <SchoolRow school={item} index={index} onPress={() => handleSelect(item)} />
                        )}
                    />
                )}
            </View>
        </View>
    );
}


// School row
function SchoolRow({ school, index, onPress }: { school: SchoolType; index: number; onPress: () => void; }) {

    // Animation
    const anim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 320,
            delay: Math.min(index, 8) * 50,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: anim,
                transform: [
                    {
                        translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 0],
                        }),
                    },
                ],
            }}
        >
            <Pressable style={styles.row} onPress={onPress}>
                <Image
                    source={require('../../../assets/images/app-icon-master.png')}
                    style={styles.rowLogo}
                    resizeMode="cover"
                />
                <View style={styles.rowText}>
                    <Text style={styles.rowName}>{school.name}</Text>
                    <Text style={styles.rowCode}>School Code: {school.code}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    body: { flex: 1, paddingHorizontal: spacing.xxl, paddingTop: spacing.xl },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        borderRadius: radius.md,
        backgroundColor: '#EFEFEF',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.xl,
    },
    searchIcon: { fontSize: 16, marginRight: spacing.sm },
    searchInput: { flex: 1, fontSize: 15, color: colors.text },
    centerState: { paddingTop: spacing.xxxl, alignItems: 'center' },
    stateText: { ...typography.description, textAlign: 'center' },
    divider: { height: 1, backgroundColor: colors.border },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    rowLogo: {
        width: 36,
        height: 36,
        borderRadius: radius.round,
        marginRight: spacing.lg,
        backgroundColor: colors.iconBackground,
    },
    rowText: { flex: 1 },
    rowName: { ...typography.title, fontSize: 16, marginBottom: 2 },
    rowCode: { ...typography.description },
});