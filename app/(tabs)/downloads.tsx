import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Download, FileText, Image as ImageIcon, Video, Music, File, Trash2, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useBrowserStore } from '@/store/browserStore';

export default function DownloadsScreen() {
  const { downloads, removeDownload } = useBrowserStore();

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return { icon: ImageIcon, color: '#10b981', bg: '#ecfdf5' };
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'wmv':
        return { icon: Video, color: '#8b5cf6', bg: '#f3e8ff' };
      case 'mp3':
      case 'wav':
      case 'aac':
        return { icon: Music, color: '#f59e0b', bg: '#fef3c7' };
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return { icon: FileText, color: '#ef4444', bg: '#fef2f2' };
      default:
        return { icon: File, color: '#6b7280', bg: '#f9fafb' };
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleRemoveDownload = (id: string) => {
    Alert.alert(
      'Remove Download',
      'Are you sure you want to remove this download?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeDownload(id),
        },
      ]
    );
  };

  const renderDownloadItem = ({ item }: { item: any }) => {
    const fileInfo = getFileIcon(item.fileName);
    const IconComponent = fileInfo.icon;
    
    return (
      <TouchableOpacity style={styles.downloadItem}>
        <View style={styles.downloadContent}>
          <View style={[styles.iconContainer, { backgroundColor: fileInfo.bg }]}>
            <IconComponent size={24} color={fileInfo.color} strokeWidth={2} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.fileName} numberOfLines={1}>
              {item.fileName}
            </Text>
            <View style={styles.fileInfo}>
              <Text style={styles.fileSize}>
                {formatFileSize(item.size)}
              </Text>
              <Text style={styles.fileDot}>•</Text>
              <Text style={styles.fileDate}>
                {formatDate(item.timestamp)}
              </Text>
            </View>
            <Text style={styles.downloadUrl} numberOfLines={1}>
              {item.url}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleRemoveDownload(item.id)}
          >
            <Trash2 size={18} color="#ef4444" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Downloads</Text>
          <View style={styles.downloadCount}>
            <Text style={styles.downloadCountText}>{downloads.length}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={20} color="#6b7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={downloads}
        renderItem={renderDownloadItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.downloadsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Download size={64} color="#d1d5db" strokeWidth={1.5} />
            <Text style={styles.emptyText}>No downloads yet</Text>
            <Text style={styles.emptySubtext}>
              Downloaded files will appear here
            </Text>
          </View>
        }
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
  downloadCount: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  downloadCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  downloadItem: {
    marginBottom: 12,
  },
  downloadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  fileDot: {
    fontSize: 14,
    color: '#d1d5db',
    marginHorizontal: 6,
  },
  fileDate: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  downloadUrl: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
});