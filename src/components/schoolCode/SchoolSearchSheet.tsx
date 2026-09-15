import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../styles/theme';
import { School } from '../../lib/types/school';
import { searchSchools } from '../../lib/api/schoolApi';
import AnimatedSchoolResult from './AnimatedSchoolResult';
import CustomModal, { CustomModalRef } from '../CustomModal';


// Type
type SchoolSearchSheetProps = {
    visible: boolean;
    setIsVisible: (state: boolean) => void;
    onSelectSchool: (school: School) => void;
};


// School search sheet
export default function SchoolSearchSheet({ visible, setIsVisible, onSelectSchool }: SchoolSearchSheetProps) {
    
    // State
    const modalRef = useRef<CustomModalRef>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<School[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);


    // School search and select
    const handleSearch = async (text: string) => {
        setQuery(text);

        if (!text.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setLoading(true);
        setHasSearched(true);

        try {
            setResults(await searchSchools(text));
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    };
    const handleSelectSchool = (school: School) => {
        modalRef.current?.close(() => onSelectSchool(school));
    };


    // Modal
    const onOpen = () => {
        setIsVisible(true);
        setQuery('');
        setResults([]);
        setHasSearched(false);
    }
    const onClose = () => {
        setIsVisible(false);
    }

    return (
        <CustomModal
            ref={modalRef}
            visible={visible}
            onOpen={onOpen}
            onClose={onClose}
        >
            <View style={styles.sheetHeader}>
                <View>
                    <Text style={styles.sheetTitle}>Find your school</Text>
                    <Text style={styles.sheetSubtitle}>Search using your school's name</Text>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>

                <TextInput
                    value={query}
                    onChangeText={handleSearch}
                    placeholder="Search school name..."
                    placeholderTextColor={colors.hash}
                    autoFocus
                    returnKeyType="search"
                    style={styles.searchInput}
                />

                {query.length > 0 && (
                    <Pressable
                        onPress={() => {
                            setQuery('');
                            setResults([]);
                            setHasSearched(false);
                        }}
                    >
                        <Text style={styles.clearSearch}>×</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.resultsContainer}>
                {loading ? (
                    <View style={styles.centerState}>
                        <ActivityIndicator size="small" color={colors.primary} />
                        <Text style={styles.stateText}>Searching schools...</Text>
                    </View>
                ) : !hasSearched ? (
                    <View style={styles.centerState}>
                        <Text style={styles.stateIcon}>🏫</Text>
                        <Text style={styles.stateTitle}>Search for your school</Text>
                        <Text style={styles.stateText}>
                            Enter your school's name above to find its code.
                        </Text>
                    </View>
                ) : results.length === 0 ? (
                    <View style={styles.centerState}>
                        <Text style={styles.stateIcon}>🔎</Text>
                        <Text style={styles.stateTitle}>No schools found</Text>
                        <Text style={styles.stateText}>
                            Try checking the spelling or search using a different name.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.resultsList}
                        renderItem={({ item, index }) => (
                            <AnimatedSchoolResult
                                school={item}
                                index={index}
                                onPress={() => handleSelectSchool(item)}
                            />
                        )}
                    />
                )}
            </View>
        </CustomModal>
    );
}


// Styles
const styles = StyleSheet.create({
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    sheetTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    sheetSubtitle: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    searchContainer: {
        height: 54,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        height: 52,
        color: colors.text,
        fontSize: 15,
    },
    clearSearch: {
        fontSize: 23,
        color: colors.textSecondary,
        paddingLeft: spacing.sm,
    },
    resultsContainer: {
        flex: 1,
        marginTop: spacing.lg,
    },
    resultsList: {
        paddingBottom: 30,
    },
    centerState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 35,
        paddingBottom: 50,
    },
    stateIcon: {
        fontSize: 34,
        marginBottom: spacing.md,
    },
    stateTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    stateText: {
        ...typography.description,
        textAlign: 'center',
    },
});