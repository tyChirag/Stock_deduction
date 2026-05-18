import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialMockData = {
  overview: {
    totalProducts: 12450,
    inventoryRemaining: 86420,
    totalOrders: 3450,
    revenue: 124500.50,
  },
  platforms: {
    amazon: {
      name: 'Amazon',
      connected: false,
      token: null,
      products: 5200,
      lowStock: 124,
      orders: 1420,
      color: 'bg-orange-500',
      productList: [
        { id: 1, name: 'Wireless Noise-Cancelling Headphones', sold: 1240, stock: 45, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
        { id: 2, name: 'Smart Fitness Watch', sold: 980, stock: 12, image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500' },
        { id: 3, name: 'Ergonomic Office Chair', sold: 850, stock: 8, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500' },
        { id: 4, name: 'Mechanical Gaming Keyboard', sold: 620, stock: 5, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500' },
        { id: 5, name: '4K Monitor', sold: 410, stock: 22, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
        { id: 6, name: 'Wireless Mouse', sold: 320, stock: 18, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500' },
      ],
      orderList: [
        { id: 'AMZ-1001', productName: 'Wireless Noise-Cancelling Headphones', status: 'Completed', date: '2023-10-25' },
        { id: 'AMZ-1002', productName: 'Smart Fitness Watch Series 5', status: 'Pending', date: '2023-10-26' },
        { id: 'AMZ-1003', productName: 'Ergonomic Office Chair', status: 'Completed', date: '2023-10-24' },
        { id: 'AMZ-1004', productName: 'Mechanical Gaming Keyboard', status: 'Completed', date: '2023-10-22' },
        { id: 'AMZ-1005', productName: 'USB-C Hub Multiport Adapter', status: 'Pending', date: '2023-10-26' },
      ]
    },
    flipkart: {
      name: 'Flipkart',
      connected: false,
      token: null,
      products: 4100,
      lowStock: 85,
      orders: 1100,
      color: 'bg-blue-500',
      productList: [
        { id: 101, name: 'Running Shoes Men', sold: 850, stock: 24, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
        { id: 102, name: 'Cotton Casual Shirt', sold: 720, stock: 50, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500' },
        { id: 103, name: 'Leather Wallet Slim', sold: 650, stock: 9, image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500' },
        { id: 104, name: 'Polarized Sunglasses', sold: 410, stock: 4, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' },
        { id: 105, name: 'Wireless Earbuds', sold: 390, stock: 18, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500' },
        { id: 106, name: 'Travel Duffel Bag', sold: 280, stock: 7, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
      ],
      orderList: [
        { id: 'FLK-2001', productName: 'Running Shoes Men', status: 'Completed', date: '2023-10-25' },
        { id: 'FLK-2002', productName: 'Cotton Casual Shirt', status: 'Pending', date: '2023-10-26' },
        { id: 'FLK-2003', productName: 'Leather Wallet Slim', status: 'Completed', date: '2023-10-23' },
        { id: 'FLK-2004', productName: 'Polarized Sunglasses', status: 'Pending', date: '2023-10-27' },
      ]
    },
    meesho: {
      name: 'Meesho',
      connected: false,
      token: null,
      products: 3150,
      lowStock: 210,
      orders: 930,
      color: 'bg-pink-500',
      productList: [
        { id: 201, name: 'Designer Kurtis Collection', sold: 1540, stock: 85, image: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=500' },
        { id: 202, name: 'Fashion Jewelry Set', sold: 1200, stock: 110, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500' },
        { id: 203, name: 'Home Decor Wall Art', sold: 980, stock: 6, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500' },
        { id: 204, name: 'Kitchen Utensils Set', sold: 850, stock: 40, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500' },
        { id: 205, name: 'Kids Educational Toys', sold: 620, stock: 8, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500' },
        { id: 206, name: 'Cotton Bed Sheets', sold: 450, stock: 3, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500' },
      ],
      orderList: [
        { id: 'MSH-3001', productName: 'Designer Kurtis Collection', status: 'Completed', date: '2023-10-24' },
        { id: 'MSH-3002', productName: 'Fashion Jewelry Set', status: 'Completed', date: '2023-10-25' },
        { id: 'MSH-3003', productName: 'Home Decor Wall Art', status: 'Pending', date: '2023-10-27' },
        { id: 'MSH-3004', productName: 'Kitchen Utensils Set', status: 'Pending', date: '2023-10-26' },
      ]
    },
    offline: {
      name: 'Offline Store',
      connected: true,
      token: null,
      products: 0,
      lowStock: 0,
      orders: 0,
      color: 'bg-green-500',
      productList: [],
      orderList: [],
    },
  },
  salesData: [
    { name: 'Mon', sales: 4000, orders: 240 },
    { name: 'Tue', sales: 3000, orders: 139 },
    { name: 'Wed', sales: 2000, orders: 980 },
    { name: 'Thu', sales: 2780, orders: 390 },
    { name: 'Fri', sales: 1890, orders: 480 },
    { name: 'Sat', sales: 2390, orders: 380 },
    { name: 'Sun', sales: 3490, orders: 430 },
  ],
  inventoryData: [
    { name: 'Amazon', stock: 45000 },
    { name: 'Flipkart', stock: 25000 },
    { name: 'Meesho', stock: 16420 },
  ],
  monthlyAnalytics: [
    { month: 'Jan', revenue: 750000, orders: 15200, profit: 150000, inventorySold: 18500, amazon: 350000, flipkart: 250000, meesho: 100000, offline: 50000 },
    { month: 'Feb', revenue: 780000, orders: 16100, profit: 165000, inventorySold: 19200, amazon: 370000, flipkart: 260000, meesho: 100000, offline: 50000 },
    { month: 'Mar', revenue: 820000, orders: 17500, profit: 180000, inventorySold: 21000, amazon: 400000, flipkart: 280000, meesho: 90000, offline: 50000 },
    { month: 'Apr', revenue: 790000, orders: 16800, profit: 170000, inventorySold: 20000, amazon: 380000, flipkart: 270000, meesho: 90000, offline: 50000 },
    { month: 'May', revenue: 850000, orders: 18200, profit: 195000, inventorySold: 22500, amazon: 420000, flipkart: 290000, meesho: 90000, offline: 50000 },
    { month: 'Jun', revenue: 880000, orders: 19000, profit: 210000, inventorySold: 23800, amazon: 450000, flipkart: 300000, meesho: 80000, offline: 50000 },
    { month: 'Jul', revenue: 920000, orders: 20500, profit: 225000, inventorySold: 25000, amazon: 480000, flipkart: 310000, meesho: 80000, offline: 50000 },
    { month: 'Aug', revenue: 950000, orders: 21200, profit: 240000, inventorySold: 26500, amazon: 500000, flipkart: 320000, meesho: 80000, offline: 50000 },
    { month: 'Sep', revenue: 1050000, orders: 23500, profit: 280000, inventorySold: 29000, amazon: 550000, flipkart: 350000, meesho: 100000, offline: 50000 },
    { month: 'Oct', revenue: 1250000, orders: 28000, profit: 350000, inventorySold: 35000, amazon: 650000, flipkart: 450000, meesho: 100000, offline: 50000 },
    { month: 'Nov', revenue: 1120000, orders: 25000, profit: 310000, inventorySold: 31000, amazon: 600000, flipkart: 380000, meesho: 90000, offline: 50000 },
    { month: 'Dec', revenue: 1180000, orders: 26500, profit: 325000, inventorySold: 33000, amazon: 620000, flipkart: 410000, meesho: 100000, offline: 50000 },
  ],
};

const useStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: {
        name: 'Chirag Tyagi',
        email: 'chirag@gmail.com',
        accountType: 'Pro Seller',
        mobile: '+91 9876543210',
        businessName: 'Tyagi Enterprises',
        address: '123 Tech Park, Bangalore',
      },
      isMobileMenuOpen: false,
      theme: 'light',
      settings: {
        notifications: {
          lowStock: true,
          newOrder: true,
          syncAlerts: false,
          weeklyReports: true,
          email: true,
          sms: false,
        },
        inventory: {
          autoSync: true,
          autoDetectDuplicates: true,
          ocrMode: 'standard',
          lowStockThreshold: 10,
          smartAlerts: true,
        },
        appearance: {
          density: 'comfortable',
          accentColor: 'blue',
        }
      },
      isLoading: false,
      data: initialMockData,
      notifications: [],
      hasInitializedNotifications: false,
      
      initializeNotifications: () => set((state) => {
        if (state.hasInitializedNotifications) return {};
        
        const initialNotifications = [];
        Object.entries(state.data.platforms).forEach(([key, platform]) => {
          // Add low stock notifications
          platform.productList.forEach(p => {
            if (p.stock < 20) {
              initialNotifications.push({
                id: `mock-stock-${key}-${p.id}`,
                message: `Product '${p.name}' is low in stock (${p.stock} left).`,
                platform: platform.name,
                productId: p.id.toString(),
                type: 'warning',
                read: false,
                link: `/inventory?product=${p.id}`,
                timestamp: new Date().toISOString()
              });
            }
          });
          
          // Add pending order notifications
          platform.orderList.forEach(o => {
            if (o.status === 'Pending') {
              initialNotifications.push({
                id: `mock-order-${key}-${o.id}`,
                message: `New pending order received for '${o.productName}'.`,
                platform: platform.name,
                orderId: o.id,
                type: 'info',
                read: false,
                link: `/orders?order=${o.id}`,
                timestamp: new Date(new Date().getTime() - Math.random() * 86400000).toISOString() // random time in last 24h
              });
            }
          });
        });
        
        // Sort by newest first
        initialNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        return { 
          notifications: initialNotifications,
          hasInitializedNotifications: true
        };
      }),

      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString() + Math.random(),
            read: false,
            timestamp: new Date().toISOString()
          },
          ...state.notifications
        ]
      })),

      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),

      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      hasConnectedPlatform: () => {
        const state = get();
        return Object.values(state.data.platforms).some(p => p.connected);
      },

      getAllProducts: () => {
        const state = get();
        const products = [];
        Object.entries(state.data.platforms).forEach(([platformKey, platform]) => {
          if (platform.connected && platform.productList) {
            platform.productList.forEach(p => {
              products.push({ ...p, platform: platform.name, platformKey });
            });
          }
        });
        return products;
      },

      getAllOrders: () => {
        const state = get();
        const orders = [];
        Object.entries(state.data.platforms).forEach(([platformKey, platform]) => {
          if (platform.connected && platform.orderList) {
            platform.orderList.forEach(o => {
              orders.push({ ...o, platform: platform.name, platformKey });
            });
          }
        });
        return orders;
      },
      
      addOfflineProduct: (product) => set((state) => {
        const defaultOffline = { name: 'Offline Store', connected: true, token: null, products: 0, lowStock: 0, orders: 0, color: 'bg-green-500', productList: [], orderList: [] };
        const offline = state.data.platforms.offline || defaultOffline;

        const normalizeName = (name) => name.toLowerCase().trim().replace(/\s+/g, ' ');
        const existing = offline.productList.find(
          (p) => normalizeName(p.name) === normalizeName(product.name)
        );

        let updatedList;
        let productsCount = offline.products;

        if (existing) {
          updatedList = offline.productList.map((p) =>
            p.id === existing.id
              ? { 
                  ...p, 
                  stock: p.stock + Number(product.stock || 0),
                  price: product.price ? Number(product.price) : p.price,
                  category: product.category || p.category,
                  sku: product.sku || p.sku,
                  image: product.image && product.image !== "https://via.placeholder.com/300" ? product.image : p.image
                }
              : p
          );
        } else {
          updatedList = [
            ...offline.productList,
            {
              id: product.id || Date.now() + Math.floor(Math.random() * 1000),
              name: product.name,
              stock: Number(product.stock || 0),
              price: Number(product.price || 0),
              category: product.category || 'Uncategorized',
              sku: product.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
              sold: 0,
              image: product.image || "https://via.placeholder.com/300"
            }
          ];
          productsCount += 1;
        }

        return {
          data: {
            ...state.data,
            platforms: {
              ...state.data.platforms,
              offline: {
                ...offline,
                productList: updatedList,
                products: productsCount
              }
            }
          }
        };
      }),

      sellOfflineProduct: (id, qty = 1) => set((state) => {
        const defaultOffline = { name: 'Offline Store', connected: true, token: null, products: 0, lowStock: 0, orders: 0, color: 'bg-green-500', productList: [], orderList: [] };
        const offline = state.data.platforms.offline || defaultOffline;

        const updatedList = offline.productList.map((p) => {
          if (p.id === id && p.stock >= qty) {
            const newStock = p.stock - qty;
            
            if (newStock < 10 && p.stock >= 10) {
              setTimeout(() => {
                get().addNotification({
                  message: `Offline Store product '${p.name}' is running low on stock (${newStock} left).`,
                  platform: 'Offline Store',
                  productId: p.id.toString(),
                  type: 'warning',
                  link: `/offline-store`
                });
              }, 0);
            }

            return {
              ...p,
              stock: newStock,
              sold: p.sold + qty
            };
          }
          return p;
        });

        return {
          data: {
            ...state.data,
            platforms: {
              ...state.data.platforms,
              offline: {
                ...offline,
                productList: updatedList
              }
            }
          }
        };
      }),

      updateOfflineProduct: (id, updates) => set((state) => {
        const defaultOffline = { name: 'Offline Store', connected: true, token: null, products: 0, lowStock: 0, orders: 0, color: 'bg-green-500', productList: [], orderList: [] };
        const offline = state.data.platforms.offline || defaultOffline;
        
        const updatedList = offline.productList.map(p => {
          if (p.id === id) {
            const newStock = updates.stock !== undefined ? updates.stock : p.stock;
            if (newStock < 10 && p.stock >= 10) {
              setTimeout(() => {
                get().addNotification({
                  message: `Offline Store product '${p.name || updates.name}' is running low on stock (${newStock} left).`,
                  platform: 'Offline Store',
                  productId: p.id.toString(),
                  type: 'warning',
                  link: `/offline-store`
                });
              }, 0);
            }
            return { ...p, ...updates };
          }
          return p;
        });

        return {
          data: {
            ...state.data,
            platforms: {
              ...state.data.platforms,
              offline: {
                ...offline,
                productList: updatedList
              }
            }
          }
        };
      }),

      deleteOfflineProduct: (id) => set((state) => {
        const defaultOffline = { name: 'Offline Store', connected: true, token: null, products: 0, lowStock: 0, orders: 0, color: 'bg-green-500', productList: [], orderList: [] };
        const offline = state.data.platforms.offline || defaultOffline;
        
        return {
          data: {
            ...state.data,
            platforms: {
              ...state.data.platforms,
              offline: {
                ...offline,
                productList: offline.productList.filter(p => p.id !== id),
                products: offline.products - 1,
              }
            }
          }
        };
      }),

      
      login: () => set({ isAuthenticated: true }),
      
      logout: () => set({ isAuthenticated: false }),
      
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),

      connectPlatform: async (platformKey) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        set((state) => ({
          data: {
            ...state.data,
            platforms: {
              ...state.data.platforms,
              [platformKey]: {
                ...state.data.platforms[platformKey],
                connected: true,
                token: `mock_token_${Date.now()}`
              }
            }
          }
        }));
      },

      disconnectPlatform: async (platformKey) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        set((state) => ({
          data: {
            ...state.data,
            platforms: {
              ...state.data.platforms,
              [platformKey]: {
                ...state.data.platforms[platformKey],
                connected: false,
                token: null
              }
            }
          }
        }));
      },
      
      refreshData: async () => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Slightly modify data to simulate changes
        set((state) => {
          const newOrders = Math.floor(Math.random() * 50);
          const newRevenue = newOrders * 45.5;
          
          return {
            isLoading: false,
            data: {
              ...state.data,
              overview: {
                ...state.data.overview,
                totalOrders: state.data.overview.totalOrders + newOrders,
                revenue: state.data.overview.revenue + newRevenue,
              }
            }
          };
        });
      },

      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
      updateSettings: (category, updates) => set((state) => ({
        settings: {
          ...state.settings,
          [category]: {
            ...state.settings[category],
            ...updates
          }
        }
      })),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'seller-sync-storage',
      version: 9, // bump version to bust cache for settings object
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        settings: state.settings,
        data: state.data, 
        theme: state.theme,
        notifications: state.notifications,
        hasInitializedNotifications: state.hasInitializedNotifications
      }),
    }
  )
);

export default useStore;
