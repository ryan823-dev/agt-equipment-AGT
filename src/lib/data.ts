import { Product, Category, Article } from '@/types';
import { products as productsData } from '@/data/products';
import { categories as categoriesData } from '@/data/categories';
import { articles as articlesData } from '@/data/articles';

// Data loader functions - directly imports data for SSG compatibility
export async function getProducts(): Promise<Product[]> {
  return productsData;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category || p.subcategory === category);
}

export async function getCategories(): Promise<Category[]> {
  return categoriesData;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getArticles(): Promise<Article[]> {
  return articlesData;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) || null;
}

// Search functionality
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter((p) => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.sku.toLowerCase().includes(lowerQuery) ||
    p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

// Related products based on tags and category
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getProducts();
  
  const scored = products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      score += p.tags.filter((t) => product.tags.includes(t)).length;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
    
  return scored;
}
