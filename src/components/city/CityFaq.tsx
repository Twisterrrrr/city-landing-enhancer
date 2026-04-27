import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Props {
  faq: { q: string; a: string }[];
}

export function CityFaq({ faq }: Props) {
  if (!faq || faq.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-5">Частые вопросы</h2>
      <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl px-4 md:px-6">
        {faq.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
