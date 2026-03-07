import { FAQ } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold mb-6">{title}</h2>
      
      {/* Microdata for FAQ (redundant with JSON-LD for better AI parsing) */}
      <div itemScope itemType="https://schema.org/FAQPage">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <AccordionTrigger itemProp="name">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
