import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { colors, metrics } from '../../styles/theme';
import CustomModal, { CustomModalRef } from '../CustomModal';
import AppText from '../AppText';

// Route type with stops
export type RouteType = {
    id: string;
    name: string;
    stops: string[];
};

type RoutesModalProps = {
    visible: boolean;
    onClose: () => void;
    onRouteSelect: (route: RouteType) => void;
    selectedRoute: RouteType;
    routes: RouteType[];
};

// Mock routes data with actual stoppage names
export const ROUTES: RouteType[] = [
    {
        id: '1',
        name: 'Route 1 - City Center',
        stops: ['School', 'Bus Stand', 'City Center', 'Clock Tower', 'Railway Station'],
    },
    {
        id: '2',
        name: 'Route 2 - North Zone',
        stops: ['School', 'North Market', 'Hospital', 'Police Station', 'Gandhi Chowk', 'Bus Depot', 'North Gate', 'Sector 12', 'Final Stop'],
    },
    {
        id: '3',
        name: 'Route 3 - South Zone',
        stops: ['School', 'South Park', 'Library', 'Community Center', 'Metro Station'],
    },
    {
        id: '4',
        name: 'Route 4 - East Express',
        stops: ['School', 'East Mall', 'Sports Complex', 'River View', 'Temple', 'East Terminal'],
    },
    {
        id: '5',
        name: 'Route 5 - West Corridor',
        stops: ['School', 'West Plaza', 'Garden', 'Museum', 'Airport Road', 'West End'],
    },
    {
        id: '6',
        name: 'Route 6 - Downtown',
        stops: ['School', 'Main Square', 'Bank', 'Post Office', 'Court', 'Downtown Hub'],
    },
    {
        id: '7',
        name: 'Route 7 - Residential Area',
        stops: ['School', 'Block A', 'Block B', 'Block C', 'Park Avenue', 'Residency'],
    },
];

export default function RoutesModal({
    visible,
    onClose,
    onRouteSelect,
    selectedRoute,
    routes = ROUTES,
}: RoutesModalProps) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const modalRef = React.useRef<CustomModalRef>(null);

    const filteredRoutes = routes.filter(route =>
        route.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRouteSelect = (route: RouteType) => {
        onRouteSelect(route);
        modalRef.current?.close();
    };

    React.useImperativeHandle(modalRef, () => ({
        close: () => {
            setSearchQuery('');
            onClose();
        },
    }));

    const handleOpen = () => {
        setSearchQuery('');
    };

    return (
        <CustomModal
            ref={modalRef}
            visible={visible}
            onClose={onClose}
            onOpen={handleOpen}
        >
            <View style={styles.modalHeader}>
                <AppText style={styles.modalTitle}>Select Route</AppText>
                <AppText style={styles.routeCount}>
                    {routes.length} routes
                </AppText>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color={colors.textSecondary}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search route..."
                    placeholderTextColor={colors.hash}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView
                style={styles.routesList}
                showsVerticalScrollIndicator={false}
            >
                {filteredRoutes.map((route) => {
                    const isSelected = route.id === selectedRoute.id;
                    return (
                        <Pressable
                            key={route.id}
                            style={[
                                styles.routeItem,
                                isSelected && styles.routeItemSelected,
                            ]}
                            onPress={() => handleRouteSelect(route)}
                        >
                            <View style={[
                                styles.busIconContainer,
                                isSelected && styles.busIconContainerSelected,
                            ]}>
                                <Ionicons
                                    name="bus"
                                    size={24}
                                    color={isSelected ? colors.white : colors.textSecondary}
                                />
                            </View>
                            
                            <View style={styles.routeInfo}>
                                <AppText style={[
                                    styles.routeName,
                                    isSelected && styles.routeNameSelected,
                                ]}>
                                    {route.name}
                                </AppText>
                                <View style={styles.stopsContainer}>
                                    <Ionicons
                                        name="location"
                                        size={14}
                                        color={colors.textSecondary}
                                    />
                                    <AppText style={styles.stopsText}>
                                        {route.stops.length} stops
                                    </AppText>
                                </View>
                            </View>

                            {isSelected && (
                                <View style={styles.checkmarkContainer}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={24}
                                        color={colors.primary}
                                    />
                                </View>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>
        </CustomModal>
    );
}

// Styles
const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.lg,
    },
    modalTitle: {
        fontSize: 20,
        color: colors.text,
    },
    routeCount: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: metrics.lg,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: metrics.lg,
        paddingHorizontal: metrics.md,
        height: 48,
    },
    searchIcon: {
        marginRight: metrics.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        padding: 0,
    },
    routesList: {
        flex: 1,
    },
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: metrics.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    routeItemSelected: {
        backgroundColor: '#F0F7FF',
    },
    busIconContainer: {
        width: 48,
        height: 48,
        borderRadius: metrics.md,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: metrics.md,
    },
    busIconContainerSelected: {
        backgroundColor: colors.primary,
    },
    routeInfo: {
        flex: 1,
    },
    routeName: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 4,
    },
    routeNameSelected: {
        color: colors.primary,
    },
    stopsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    stopsText: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    checkmarkContainer: {
        marginLeft: metrics.sm,
    },
});