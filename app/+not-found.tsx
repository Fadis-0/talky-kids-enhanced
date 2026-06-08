import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('notFound.title')}</Text>
        <Text style={styles.message}>{t('notFound.message')}</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t('notFound.link')}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
