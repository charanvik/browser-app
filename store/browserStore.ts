import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

interface Tab {
  id: string;
  url: string;
  title: string;
}

interface Download {
  id: string;
  fileName: string;
  url: string;
  size: number;
  timestamp: number;
}

interface BrowserState {
  history: HistoryItem[];
  tabs: Tab[];
  activeTabId: string | null;
  downloads: Download[];
  currentTab: Tab | null;
  
  // History actions
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  
  // Tab actions
  createTab: (url: string, title: string) => void;
  closeTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  setActiveTab: (id: string) => void;
  
  // Download actions
  addDownload: (download: Download) => void;
  removeDownload: (id: string) => void;
}

export const useBrowserStore = create<BrowserState>()(
  persist(
    (set, get) => ({
      history: [],
      tabs: [
        {
          id: 'default',
          url: 'https://www.google.com',
          title: 'Google',
        },
      ],
      activeTabId: 'default',
      downloads: [
        // Sample downloads for demonstration
        {
          id: '1',
          fileName: 'sample-document.pdf',
          url: 'https://example.com/document.pdf',
          size: 2048576, // 2MB
          timestamp: Date.now() - 86400000, // 1 day ago
        },
        {
          id: '2',
          fileName: 'image.jpg',
          url: 'https://example.com/image.jpg',
          size: 1024768, // 1MB
          timestamp: Date.now() - 172800000, // 2 days ago
        },
      ],
      currentTab: {
        id: 'default',
        url: 'https://www.google.com',
        title: 'Google',
      },

      addToHistory: (item) =>
        set((state) => ({
          history: [item, ...state.history.slice(0, 999)], // Keep last 1000 items
        })),

      clearHistory: () => set({ history: [] }),

      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),

      createTab: (url, title) => {
        const newTab = {
          id: Date.now().toString(),
          url,
          title,
        };
        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: newTab.id,
          currentTab: newTab,
        }));
      },

      closeTab: (id) =>
        set((state) => {
          const filteredTabs = state.tabs.filter((tab) => tab.id !== id);
          const newActiveTab = filteredTabs.length > 0 ? filteredTabs[0].id : null;
          return {
            tabs: filteredTabs,
            activeTabId: newActiveTab,
            currentTab: filteredTabs.find((tab) => tab.id === newActiveTab) || null,
          };
        }),

      updateTab: (id, updates) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === id ? { ...tab, ...updates } : tab
          ),
          currentTab:
            state.currentTab?.id === id
              ? { ...state.currentTab, ...updates }
              : state.currentTab,
        })),

      setActiveTab: (id) =>
        set((state) => ({
          activeTabId: id,
          currentTab: state.tabs.find((tab) => tab.id === id) || null,
        })),

      addDownload: (download) =>
        set((state) => ({
          downloads: [download, ...state.downloads],
        })),

      removeDownload: (id) =>
        set((state) => ({
          downloads: state.downloads.filter((download) => download.id !== id),
        })),
    }),
    {
      name: 'browser-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);