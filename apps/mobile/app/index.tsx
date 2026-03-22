import { StyleSheet, Text, View, ScrollView, Pressable, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const GOLD = '#D4A853'
const BG = '#0D1117'
const SURFACE = '#161B22'
const MUTED = '#8B949E'
const FOREGROUND = '#E6EDF3'

const ADVENTURES = [
  { label: 'Whitewater Rafting', icon: 'water-outline' as const, url: 'https://royalgorgerafting.net' },
  { label: 'Zipline Tours', icon: 'thunderstorm-outline' as const, url: 'https://royalgorgeziplinetours.com' },
  { label: 'Vacation Rentals', icon: 'home-outline' as const, url: 'https://royalgorgevacationrentals.com' },
  { label: 'Epic Adventures', icon: 'compass-outline' as const, url: 'https://royalgorgeepicadventures.com' },
  { label: 'Dining & Bars', icon: 'restaurant-outline' as const, url: 'https://whitewaterbar.com' },
  { label: 'Rooftop Social', icon: 'sunny-outline' as const, url: 'https://wwrooftopsocial.com' },
]

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Ionicons name="mountain-outline" size={16} color={GOLD} />
          <Text style={styles.heroBadgeText}>Canon City, Colorado</Text>
        </View>
        <Text style={styles.heroTitle}>Royal Gorge{'\n'}Adventures</Text>
        <Text style={styles.heroSub}>
          956 ft deep · 5.5 mi long · Endless adventure
        </Text>
      </View>

      {/* Adventure grid */}
      <Text style={styles.sectionTitle}>Browse Adventures</Text>
      <View style={styles.grid}>
        {ADVENTURES.map(({ label, icon, url }) => (
          <Pressable
            key={label}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => Linking.openURL(url)}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <View style={styles.cardIcon}>
              <Ionicons name={icon} size={24} color={GOLD} />
            </View>
            <Text style={styles.cardLabel}>{label}</Text>
            <Ionicons name="chevron-forward" size={14} color={MUTED} style={styles.cardChevron} />
          </Pressable>
        ))}
      </View>

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        onPress={() => Linking.openURL('https://exploreroyalgorge.com/directory')}
        accessibilityRole="button"
        accessibilityLabel="Browse full directory"
      >
        <Text style={styles.ctaText}>View Full Directory</Text>
        <Ionicons name="arrow-forward" size={16} color={BG} />
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { padding: 20, paddingBottom: 40 },
  hero: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(212,168,83,0.3)',
    backgroundColor: 'rgba(212,168,83,0.1)',
    marginBottom: 16,
  },
  heroBadgeText: { fontSize: 12, color: GOLD, fontWeight: '600' },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: FOREGROUND,
    textAlign: 'center',
    lineHeight: 42,
  },
  heroSub: { marginTop: 10, fontSize: 14, color: MUTED, textAlign: 'center' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: FOREGROUND,
    marginBottom: 12,
  },
  grid: { gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#21262D',
    padding: 16,
    minHeight: 60,
  },
  cardPressed: { opacity: 0.75 },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(212,168,83,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: FOREGROUND },
  cardChevron: { marginLeft: 4 },
  cta: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 14,
    minHeight: 50,
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: { fontSize: 15, fontWeight: '700', color: BG },
})
