import { BreadcrumbItem } from '@/types';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-4">
      <ol className="flex items-center flex-wrap gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {allItems.map((item, index) => (
          <li key={item.href} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            {index === 0 ? (
              <Link href={item.href} className="hover:text-foreground flex items-center" itemProp="item">
                <Home className="h-4 w-4" />
                <span className="sr-only" itemProp="name">{item.name}</span>
              </Link>
            ) : index === allItems.length - 1 ? (
              <span className="text-foreground font-medium" itemProp="name">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-foreground" itemProp="item">
                <span itemProp="name">{item.name}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
