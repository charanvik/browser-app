import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import BrowserHeader from '@/components/BrowserHeader';
import { useBrowserStore } from '@/store/browserStore';

export default function HomeTab() {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToHistory, currentTab, updateTab } = useBrowserStore();

  const handleNavigationStateChange = (navState: any) => {
    setCurrentUrl(navState.url);
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setLoading(navState.loading);
    
    // Add to history if not loading
    if (!navState.loading && navState.url) {
      addToHistory({
        id: Date.now().toString(),
        url: navState.url,
        title: navState.title || navState.url,
        timestamp: Date.now(),
      });
    }

    // Update current tab
    if (currentTab) {
      updateTab(currentTab.id, {
        url: navState.url,
        title: navState.title || navState.url,
      });
    }
  };

  const navigateToUrl = (url: string) => {
    let formattedUrl = url.trim();
    
    // Add https:// if no protocol is specified
    if (!/^https?:\/\//i.test(formattedUrl)) {
      // Check if it looks like a domain
      if (formattedUrl.includes('.') && !formattedUrl.includes(' ')) {
        formattedUrl = `https://${formattedUrl}`;
      } else {
        // Treat as search query
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}`;
      }
    }
    
    setCurrentUrl(formattedUrl);
  };

  const goBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const reload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BrowserHeader
        url={currentUrl}
        onNavigate={navigateToUrl}
        onBack={goBack}
        onForward={goForward}
        onReload={reload}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        loading={loading}
      />
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
            
            // Handle SSL errors gracefully
            if (nativeEvent.description && nativeEvent.description.includes('SSL error')) {
              Alert.alert(
                'Connection Error',
                'This website has an SSL certificate issue. The connection may not be secure.',
                [
                  { text: 'Go Back', onPress: () => goBack() },
                  { text: 'Continue Anyway', style: 'destructive' }
                ]
              );
            }
          }}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          style={styles.webView}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});