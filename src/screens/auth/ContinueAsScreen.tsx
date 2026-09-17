import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { colors, typography } from '../../styles/theme';
import Card from '../../components/Card';



// Option card
type OptionProps = {
  title: string;
  description: string;
  icon: string;
  pressHandler: () => void;
};
const OptionCard = ({
    title,
    description,
    icon,
    pressHandler,
}: OptionProps) => {

    return (
        <Card onPress={pressHandler}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>

                {/* Text */}
                <View style={styles.cardContent}>
                    <Text style={typography.title}>
                        {title}
                    </Text>

                    <Text style={typography.description}>
                        {description}
                    </Text>
                    </View>

                    {/* Arrow */}
                    <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>
                        →
                    </Text>
                </View>
            </View>
        </Card>
    )

    // return (
    //     <Animated.View
    //         style={[
    //             styles.cardWrapper,
    //             {
    //                 transform: [{ scale }],
    //             },
    //         ]}
    //     >
    //         <Pressable
    //             style={styles.card}
    //             onPress={onPress}
    //             onPressIn={handlePressIn}
    //             onPressOut={handlePressOut}
    //         >
    //             {/* Icon */}
    //             <View style={styles.iconContainer}>
    //                 <Text style={styles.icon}>{icon}</Text>
    //             </View>

    //             {/* Text */}
    //             <View style={styles.cardContent}>
    //                 <Text style={typography.title}>
    //                     {title}
    //                 </Text>

    //                 <Text style={typography.description}>
    //                     {description}
    //                 </Text>
    //                 </View>

    //                 {/* Arrow */}
    //                 <View style={styles.arrowContainer}>
    //                 <Text style={styles.arrow}>
    //                     →
    //                 </Text>
    //             </View>
    //         </Pressable>
    //     </Animated.View>
    // );
};

export default function ContinueAsScreen ({ navigation }: any) {
    return (
        <View style={styles.container}>
            
            <StatusBar
                barStyle="dark-content"
            />

            {/* Background decoration */}
            <View style={styles.backgroundCircle} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                // bounces={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.brandRow}>
                        <Text style={styles.brand}>
                            QODUM
                        </Text>

                        <View style={styles.brandLine} />
                    </View>

                    <Text style={styles.title}>
                        Continue as
                    </Text>

                    <Text style={styles.subtitle}>
                        Choose how you want to use Qodum.
                    </Text>
                </View>

                {/* Options */}
                <View style={styles.optionsContainer}>

                    <OptionCard
                        icon="🎓"
                        title="Student Admission"
                        description="Apply to a school and start your admission journey."
                        pressHandler={() => navigation.navigate('SchoolCode', {next_page:'StudentAdmissionForm'})}
                    />

                    <OptionCard
                        icon="🏫"
                        title="School Login"
                        description="Access your school account, assignments, fees, and activities."
                        pressHandler={() => navigation.navigate('SchoolCode', {next_page:'ChooseRole'})}
                    />

                    <OptionCard
                        icon="💼"
                        title="Job Opening"
                        description="Explore available positions and apply to join a school."
                        pressHandler={() => navigation.navigate('SchoolCode', {next_page:'JobOpening'})}
                    />

                    <OptionCard
                        icon="🤝"
                        title="Join Alumni Network"
                        description="Connect with your school community and join the alumni network."
                        pressHandler={() => navigation.navigate('AlumniForm')}
                    />

                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        One platform. Every part of your school journey.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    },


    // Background
    backgroundCircle: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#F1FAFE',
        top: -150,
        right: -110,
    },


    // Scroll
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 62,
        paddingBottom: 35,
    },


    // Header
    header: {
        marginBottom: 30,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    brand: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 3,
        color: '#0D1B2A',
    },
    brandLine: {
        width: 28,
        height: 2,
        backgroundColor: colors.primary,
        borderRadius: 2,
        marginLeft: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#12263A',
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: '#718096',
        marginTop: 8,
        maxWidth: 310,
    },


    // Options
    optionsContainer: {
        gap: 14,
    },
    cardWrapper: {
        width: '100%',
    },
    card: {
        minHeight: 105,
        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#E6EEF3',

        borderRadius: 22,

        padding: 16,

        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: '#0B2538',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.055,
        shadowRadius: 14,
        elevation: 2,
    },


    // Icon
    iconContainer: {
        width: 58,
        height: 58,
        borderRadius: 18,

        backgroundColor: colors.iconBackground,

        alignItems: 'center',
        justifyContent: 'center',

        marginRight: 14,
    },
    icon: {
        fontSize: 26,
    },


    // Card content
    cardContent: {
        flex: 1,
        paddingRight: 8,
    },


    // Arrow
    arrowContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,

        backgroundColor: colors.iconBackground,

        alignItems: 'center',

        marginLeft: 6,
    },
    arrow: {
        color: colors.primary,
        fontSize: 21,
        fontWeight: '400',
        marginTop: -2,
    },


    // Footer
    footer: {
        alignItems: 'center',
        marginTop: 32,
    },
    footerText: {
        fontSize: 11,
        color: '#A0ADB8',
        textAlign: 'center',
        letterSpacing: 0.1,
    }

});