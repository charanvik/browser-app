import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import { Plus, X, Globe } from 'lucide-react-native';
import { useBrowserStore } from '@/store/browserStore';

export default function TabsScreen() {
  const { tabs, activeTabId, createTab, closeTab, setActiveTab } = useBrowserStore();

  const handleCreateTab = () => {
    createTab('https://www.google.com', 'New Tab');
  };

  const handleCloseTab = (tabId: string) => {
    closeTab(tabId);
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=32&h=32';
    }
  };

  const renderTab = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.tabCard,
        item.id === activeTabId && styles.activeTabCard,
      ]}
      onPress={() => handleSelectTab(item.id)}
    >
      <View style={styles.tabPreview}>
        <View style={styles.tabHeader}>
          <View style={styles.faviconContainer}>
            <Image
              source={{ uri: getFavicon(item.url) }}
              style={styles.favicon}
              defaultSource={{ uri: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=32&h=32' }}
            />
          </View>
          <View style={styles.tabInfo}>
            <Text style={styles.tabTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.tabUrl} numberOfLines={1}>
              {item.url}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => handleCloseTab(item.id)}
          >
            <X size={16} color="#6b7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContent}>
          <View style={styles.mockWebpage}>
            <View style={styles.mockHeader} />
            <View style={styles.mockBody}>
              <View style={styles.mockLine} />
              <View style={styles.mockLine} />
              <View style={[styles.mockLine, { width: '60%' }]} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Tabs</Text>
          <View style={styles.tabCount}>
            <Text style={styles.tabCountText}>{tabs.length}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.newTabButton} onPress={handleCreateTab}>
          <Plus size={24} color="#ffffff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tabs}
        renderItem={renderTab}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tabsList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.tabRow}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  tabCount: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  tabCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  newTabButton: {
    backgroundColor: '#3b82f6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  tabsList: {
    padding: 16,
  },
  tabRow: {
    justifyContent: 'space-between',
  },
  tabCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeTabCard: {
    borderColor: '#3b82f6',
    elevation: 4,
    shadowOpacity: 0.15,
  },
  tabPreview: {
    padding: 12,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  faviconContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  favicon: {
    width: 24,
    height: 24,
  },
  tabInfo: {
    flex: 1,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  tabUrl: {
    fontSize: 12,
    color: '#6b7280',
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  tabContent: {
    height: 120,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  mockWebpage: {
    flex: 1,
    padding: 8,
  },
  mockHeader: {
    height: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  mockBody: {
    flex: 1,
    gap: 4,
  },
  mockLine: {
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    width: '100%',
  },
});