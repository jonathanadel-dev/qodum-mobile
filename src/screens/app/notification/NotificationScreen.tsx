import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import Card from '../../../components/Card';
import { colors, metrics } from '../../../styles/theme';


// Type
type Tab = 'notice' | 'circulars';
type NotificationItem = {
  id: string;
  icon: any;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  category: string;
  attachmentName?: string;
};


// Mock data
const NOTICE_ITEMS: NotificationItem[] = [
  {
    id: 'n1',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Annual Day Function',
    description: 'Annual Day will be celebrated on the school premises this year.',
    date: '15/12/2025',
    time: '03:25 PM',
    type: 'Event',
    category: 'General',
  },
  {
    id: 'n2',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Unit Test Schedule',
    description: 'Unit tests for all classes will begin from next week.',
    date: '18/12/2025',
    time: '10:00 AM',
    type: 'Exam',
    category: 'Academics',
  },
  {
    id: 'n3',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Winter Vacation',
    description: 'School will remain closed for winter vacation.',
    date: '20/12/2025',
    time: '09:30 AM',
    type: 'Holiday',
    category: 'General',
  },
  {
    id: 'n4',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Parent Teacher Meeting',
    description: 'PTM will be held for all classes this weekend.',
    date: '22/12/2025',
    time: '11:00 AM',
    type: 'Meeting',
    category: 'General',
  },
  {
    id: 'n5',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Sports Day Practice',
    description: 'Students participating in Sports Day must attend practice sessions regularly.',
    date: '23/12/2025',
    time: '08:00 AM',
    type: 'Practice',
    category: 'Sports',
  },
];
const CIRCULAR_ITEMS: NotificationItem[] = [
  {
    id: 'c1',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Revised School Timings',
    description: 'School timings have been revised due to winter schedule. Please note the updated timings.',
    date: '12/12/2025',
    time: '09:00 AM',
    type: 'Circular',
    category: 'General',
    attachmentName: 'revised_timing.pdf',
  },
  {
    id: 'c2',
    icon: require('../../../assets/images/notifications/event.png'),
    title: 'Uniform Guidelines Update',
    description: 'Updated uniform guidelines for the upcoming term have been issued.',
    date: '14/12/2025',
    time: '01:00 PM',
    type: 'Circular',
    category: 'General',
    attachmentName: 'uniform_guidelines.pdf',
  },
];


// Notification screen
export default function NotificationScreen({ navigation }: NativeStackScreenProps<any>) {

  // State
  const [activeTab, setActiveTab] = useState<Tab>('notice');
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const items = activeTab === 'notice' ? NOTICE_ITEMS : CIRCULAR_ITEMS;
  const pillWidth = containerWidth ? containerWidth / 2 : 0;


  // Handlers
  const handleTabPress = (tab: Tab) => {
      if (tab === activeTab) return;
      setActiveTab(tab);
      Animated.timing(slideAnim, {
          toValue: tab === 'notice' ? 0 : 1,
          duration: 260,
          useNativeDriver: true,
      }).start();
  };
  const handleItemPress = (item: NotificationItem) => {
      navigation.navigate('NotificationDetails', { notification: item });
  };


  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Notifications" isStack={true}/>

      <View
          style={styles.tabsContainer}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {containerWidth > 0 && (
            <Animated.View
              style={[
                styles.tabPill,
                {
                  width: pillWidth,
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, pillWidth],
                      }),
                    },
                ],
                },
              ]}
            />
        )}

        <Pressable style={styles.tabButton} onPress={() => handleTabPress('notice')}>
          <Text style={[styles.tabText, activeTab === 'notice' && styles.tabTextActive]}>
            Notice
          </Text>
        </Pressable>

        <Pressable style={styles.tabButton} onPress={() => handleTabPress('circulars')}>
          <Text style={[styles.tabText, activeTab === 'circulars' && styles.tabTextActive]}>
            Circulars
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            onPress={() => handleItemPress(item)}
            style={styles.itemCard}
          >
            <View style={styles.itemTopRow}>
              <Image source={item.icon} style={styles.itemIcon} resizeMode="contain" />

              <View style={styles.itemTextBlock}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={1}>
                    {item.description}
                </Text>
              </View>

              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={18} color={colors.primary} />
              </View>
            </View>

            <View style={styles.itemDivider} />

            <View style={styles.itemMetaRow}>
                <View style={styles.itemMetaCol}>
                    <Text style={styles.itemMetaLabel}>Date</Text>
                    <Text style={styles.itemMetaValue}>{item.date}</Text>
                </View>
                <View style={styles.itemMetaCol}>
                    <Text style={styles.itemMetaLabel}>Time</Text>
                    <Text style={styles.itemMetaValue}>{item.time}</Text>
                </View>
                <View style={styles.itemMetaCol}>
                    <Text style={styles.itemMetaLabel}>Type</Text>
                    <Text style={styles.itemMetaValue}>{item.type}</Text>
                </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: metrics.xxxl
    },
    tabsContainer: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: colors.iconBackground,
        borderRadius: metrics.round,
        marginHorizontal: metrics.xl,
        marginTop: metrics.xl,
        marginBottom: metrics.lg,
        height: 52,
        overflow: 'hidden',
    },
    tabPill: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        backgroundColor: colors.primary,
        borderRadius: metrics.round,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.white,
        fontWeight: '700',
    },
    list: {
        paddingHorizontal: metrics.xl,
        paddingBottom: metrics.xxxl,
        gap: metrics.lg,
    },
    itemCard: {
        marginBottom: 0,
    },
    itemTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        width: 48,
        height: 48,
        borderRadius: metrics.md,
        marginRight: metrics.md,
    },
    itemTextBlock: {
        flex: 1,
        marginRight: metrics.sm,
    },
    itemTitle: {
        // ...typography.title,
        fontSize: 16,
        marginBottom: 2,
    },
    itemDescription: {
        // ...typography.description,
    },
    chevronCircle: {
        width: 32,
        height: 32,
        borderRadius: metrics.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: metrics.md,
    },
    itemMetaRow: {
        flexDirection: 'row',
    },
    itemMetaCol: {
        flex: 1,
        alignItems: 'center',
    },
    itemMetaLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 2,
    },
    itemMetaValue: {
        fontSize: 13,
        color: colors.textSecondary,
    },
});