import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../navigation/AuthStack';

import Header from '../../../components/Header';
import { colors, metrics } from '../../../styles/theme';
import { getSchools, SchoolType } from '../../../lib/api/schoolApi';
import AppText from '../../../components/AppText';
import { useStaggeredFadeInUp } from '../../../hooks/animations/useStaggeredFadeInUp';


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

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setLoadError(false);
            try {
                const schools = await getSchools();
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

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return allSchools;
        return allSchools.filter(
            (school) =>
                school.name.toLowerCase().includes(q) ||
                school.code.toLowerCase().includes(q),
        );
    }, [query, allSchools]);

    const handleSelect = (school: SchoolType) => {
        onSelect(school);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Find Your School or College" />

            <View style={styles.body}>
                <View style={styles.searchBar}>
                    <AppText style={styles.searchIcon}>🔍</AppText>
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
                        <AppText style={styles.stateText}>
                            Couldn't load schools. Pull down to try again.
                        </AppText>
                    </View>
                ) : results.length === 0 ? (
                    <View style={styles.centerState}>
                        <AppText style={styles.stateText}>
                            No schools found. Try a different name.
                        </AppText>
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
    const entranceStyle = useStaggeredFadeInUp({ index });

    return (
        <Animated.View style={entranceStyle}>
            <Pressable style={styles.row} onPress={onPress}>
                <Image
                    source={require('../../../assets/images/app-icon-master.png')}
                    style={styles.rowLogo}
                    resizeMode="cover"
                />
                <View style={styles.rowText}>
                    <AppText variant='h3' style={styles.rowName}>{school.name}</AppText>
                    <AppText variant='desc'>School Code: {school.code}</AppText>
                </View>
            </Pressable>
        </Animated.View>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    body: {
        flex: 1,
        paddingHorizontal: metrics.xxl,
        paddingTop: metrics.xl
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        borderRadius: metrics.md,
        backgroundColor: colors.grayBackground,
        paddingHorizontal: metrics.lg,
        marginBottom: metrics.xl,
    },
    searchIcon: { fontSize: 16, marginRight: metrics.sm },
    searchInput: { flex: 1, fontSize: 15, color: colors.text },
    centerState: { paddingTop: metrics.xxxl, alignItems: 'center' },
    stateText: { textAlign: 'center' },
    divider: { height: 1, backgroundColor: colors.border },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: metrics.sm,
    },
    rowLogo: {
        width: 36,
        height: 36,
        borderRadius: metrics.round,
        marginRight: metrics.lg,
        backgroundColor: colors.iconBackground,
    },
    rowText: { flex: 1 },
    rowName: { fontSize: 16, marginBottom: 2 },
});