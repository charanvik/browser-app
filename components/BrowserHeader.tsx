import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Text,
} from 'react-native';
import { ArrowLeft, ArrowRight, RotateCcw, MoveVertical as MoreVertical, Shield, Lock } from 'lucide-react-native';
import SettingsMenu from './SettingsMenu';

interface BrowserHeaderProps {
  url: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  loading: boolean;
}

export default function BrowserHeader({
  url,
  onNavigate,
  onBack,
  onForward,
  onReload,
  canGoBack,
  canGoForward,
  loading,
}: BrowserHeaderProps) {
  const [searchText, setSearchText] = useState(url);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Update searchText when url changes and not editing
  React.useEffect(() => {
    if (!isEditing) {
      setSearchText(url);
    }
  }, [url, isEditing]);

  const handleSubmit = () => {
    if (searchText.trim()) {
      onNavigate(searchText);
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const getSecurityIcon = () => {
    if (url.startsWith('https://')) {
      return <Lock size={14} color="#10b981" />;
    }
    return <Shield size={14} color="#f59e0b" />;
  };

  const formatDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        {/* Navigation Controls */}
        <View style={styles.navigationControls}>
          <TouchableOpacity
            style={[styles.navButton, !canGoBack && styles.disabledButton]}
            onPress={onBack}
            disabled={!canGoBack}
          >
            <ArrowLeft size={18} color={canGoBack ? '#374151' : '#d1d5db'} strokeWidth={2.5} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, !canGoForward && styles.disabledButton]}
            onPress={onForward}
            disabled={!canGoForward}
          >
            <ArrowRight size={18} color={canGoForward ? '#374151' : '#d1d5db'} strokeWidth={2.5} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={onReload}>
            {loading ? (
              <ActivityIndicator size={18} color="#374151" />
            ) : (
              <RotateCcw size={18} color="#374151" strokeWidth={2.5} />
            )}
          </TouchableOpacity>
        </View>

        {/* Address Bar */}
        <View style={[styles.addressBar, isEditing && styles.addressBarFocused]}>
          <View style={styles.securityIndicator}>
            {getSecurityIcon()}
          </View>
          
          <TextInput
            style={styles.addressInput}
            value={isEditing ? searchText : ''}
            onChangeText={setSearchText}
            onSubmitEditing={handleSubmit}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isEditing ? 'Search or type URL' : formatDisplayUrl(url)}
            placeholderTextColor={isEditing ? '#9ca3af' : '#374151'}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            selectionColor="#3b82f6"
          />
          
          {!isEditing && (
            <Text style={styles.urlText} numberOfLines={1}>
              {formatDisplayUrl(url)}
            </Text>
          )}
        </View>

        {/* Menu Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <MoreVertical size={20} color="#374151" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <SettingsMenu onClose={() => setShowMenu(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  navigationControls: {
    flexDirection: 'row',
    gap: 4,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.4,
  },
  addressBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    minHeight: 44,
    position: 'relative',
  },
  addressBarFocused: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#3b82f6',
    elevation: 2,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  securityIndicator: {
    marginRight: 8,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '400',
    padding: 0,
  },
  urlText: {
    position: 'absolute',
    left: 40,
    right: 16,
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
    pointerEvents: 'none',
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});