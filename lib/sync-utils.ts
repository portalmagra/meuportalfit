// Utilitário de sincronização para produtos entre dispositivos

export interface SyncMessage {
  type: 'products-updated' | 'categories-updated';
  products?: any[];
  categories?: any[];
  timestamp: number;
  action?: 'product-added' | 'product-updated' | 'category-added';
}

export const loadProductsFromStorage = (categoryId: string) => {
  try {
    // Tentar carregar de ambas as chaves para garantir sincronização
    let storedProducts = localStorage.getItem('adminProducts');
    if (!storedProducts) {
      storedProducts = localStorage.getItem('globalProducts');
    }
    
    console.log(`🔄 Carregando produtos ${categoryId} do localStorage:`, storedProducts ? 'encontrado' : 'não encontrado');
    
    if (storedProducts) {
      const allProducts = JSON.parse(storedProducts);
      const categoryProducts = allProducts.filter((product: any) => 
        product.categoryId === categoryId
      );
      console.log(`📦 Produtos da categoria ${categoryId}:`, categoryProducts.length, 'produtos');
      return categoryProducts;
    }
  } catch (error) {
    console.error(`❌ Erro ao carregar produtos ${categoryId}:`, error);
  }
  return [];
};

export const setupProductSync = (
  categoryId: string, 
  setProducts: (products: any[]) => void,
  setLoading: (loading: boolean) => void
) => {
  // Carregar produtos iniciais
  const loadProducts = () => {
    const products = loadProductsFromStorage(categoryId);
    setProducts(products);
    setLoading(false);
  };

  loadProducts();
  
  // Sincronizar com mudanças de outros dispositivos
  try {
    const channel = new BroadcastChannel('admin-sync');
    console.log(`📡 Escutando sincronização na página ${categoryId}`);
    
    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      console.log(`📨 Mensagem recebida ${categoryId}:`, event.data.type, event.data.action || '');
      
      if (event.data.type === 'products-updated' && event.data.products) {
        const categoryProducts = event.data.products.filter((product: any) => 
          product.categoryId === categoryId
        );
        console.log(`📦 Produtos atualizados via sincronização ${categoryId}:`, categoryProducts.length, 'produtos');
        setProducts(categoryProducts);
        
        // Atualizar localStorage local também
        localStorage.setItem('adminProducts', JSON.stringify(event.data.products));
        localStorage.setItem('globalProducts', JSON.stringify(event.data.products));
      }
    };
    
    return () => {
      console.log(`🔌 Fechando canal de sincronização ${categoryId}`);
      channel.close();
    };
  } catch (error) {
    console.log(`❌ BroadcastChannel não suportado na página ${categoryId}:`, error);
    return () => {};
  }
};

export const sendProductSync = (products: any[], action?: string) => {
  try {
    const channel = new BroadcastChannel('admin-sync');
    console.log('📡 Enviando sincronização via BroadcastChannel');
    channel.postMessage({
      type: 'products-updated',
      products: products,
      timestamp: Date.now(),
      action: action
    });
    channel.close();
    console.log('✅ Sincronização enviada com sucesso');
  } catch (error) {
    console.log('❌ Erro na sincronização:', error);
  }
};

export const saveProductsToStorage = (products: any[]) => {
  if (products.length > 0) {
    console.log('💾 Salvando produtos no localStorage:', products.length, 'produtos');
    localStorage.setItem('adminProducts', JSON.stringify(products));
    localStorage.setItem('globalProducts', JSON.stringify(products));
  }
};
