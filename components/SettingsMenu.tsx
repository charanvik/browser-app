import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Shield, Lock, Eye, Download, Settings, Info, CircleHelp as HelpCircle, Star, X, History, Bookmark, Share, Moon, Zap, Globe } from 'lucide-react-native';

interface SettingsMenuProps {
  onClose: () => void;
}

export default function SettingsMenu({ onClose }: SettingsMenuProps) {
  const quickActions = [
    { icon: Star, label: 'Bookmarks' },
    { icon: History, label: 'History' },
    { icon: Download, label: 'Downloads' },
    { icon: Share, label: 'Share' },
  ];

  const menuItems = [
    { icon: Moon, label: 'Dark mode', description: 'Toggle dark theme', hasToggle: true },
    { icon: Shield, label: 'Privacy & Security', description: 'Manage privacy settings' },
    { icon: Lock, label: 'Site Permissions', description: 'Camera, location, notifications' },
    { icon: Eye, label: 'Incognito Mode', description: 'Browse privately' },
    { icon: Zap, label: 'Performance', description: 'Speed and data usage' },
    { icon: Globe, label: 'Language', description: 'Change browser language' },
    { icon: Settings, label: 'Advanced Settings', description: 'Developer options' },
    { icon: HelpCircle, label: 'Help & Feedback', description: 'Get support' },
    { icon: Info, label: 'About Browser', description: 'Version and updates' },
  ];

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable style={styles.menuContainer} onPress={(e) => e.stopPropagation()}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Browser Menu</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6b7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity key={index} style={styles.quickActionItem}>
                <View style={styles.quickActionIcon}>
                  <IconComponent size={20} color="#3b82f6" strokeWidth={2} />
                </View>
                <Text style={styles.quickActionLabel}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <View style={styles.divider} />
        
        {/* Menu Items */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <View style={styles.iconContainer}>
                    <IconComponent size={20} color="#374151" strokeWidth={2} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.itemLabel}>{item.label}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                  {item.hasToggle && (
                    <View style={styles.toggle}>
                      <View style={styles.toggleTrack}>
                        <View style={styles.toggleThumb} />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  quickActionItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  toggle: {
    marginLeft: 12,
  },
  toggleTrack: {
    width: 44,
    height: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignSelf: 'flex-end',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});