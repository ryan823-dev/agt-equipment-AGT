import { notFound, permanentRedirect } from 'next/navigation';
import { getProductPath } from '@/data/products';
import { getProductBySlug } from '@/lib/data';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyProductRedirect({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  permanentRedirect(getProductPath(product));
}
