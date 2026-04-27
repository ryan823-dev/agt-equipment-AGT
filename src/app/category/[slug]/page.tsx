import { notFound, permanentRedirect } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/data';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyCategoryRedirect({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  if (category.tier === 'tier2' && category.parentSlug) {
    permanentRedirect(`/${category.parentSlug}/${category.slug}/`);
  }

  permanentRedirect(`/${category.slug}/`);
}
