import { generateFAQSchema } from '@/lib/schema';
import { homepageFAQ } from '@/data/faq';

export function HomepageSchema() {
  const faqSchema = generateFAQSchema(homepageFAQ);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}
