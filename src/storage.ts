/**
 * Storage abstraction for React Native compatibility
 * Falls back to memory storage if AsyncStorage is not available
 */

interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.store.get(key) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }
}

async function createStorage(): Promise<Storage> {
  try {
    // Try to dynamically import AsyncStorage for React Native
    const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
    return AsyncStorageModule.default;
  } catch (error) {
    // Fallback to memory storage for non-React Native environments
    console.warn('AsyncStorage not available, using memory storage. This means tokens will not persist between app restarts.');
    return new MemoryStorage();
  }
}

// Create a storage instance promise
const storagePromise = createStorage();

export async function getStorage(): Promise<Storage> {
  return storagePromise;
}
