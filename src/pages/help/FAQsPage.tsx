import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How does Water Down work?",
    answer:
      "Water Down analyzes your bet slips using OCR technology and suggests alternative betting options with lower risk while maintaining potential profits.",
  },
  {
    question: "What sportsbooks are supported?",
    answer:
      "We currently support FanDuel, DraftKings, Caesars, and BetMGM. More sportsbooks will be added soon.",
  },
  {
    question: "How accurate is the OCR?",
    answer:
      "Our OCR system is optimized for bet slip formats and achieves over 95% accuracy. We recommend reviewing the extracted data for accuracy.",
  },
  {
    question: "Is my betting data secure?",
    answer:
      "Yes, all betting data is encrypted and stored securely. We never share your personal information with third parties.",
  },
  {
    question: "Can I use Water Down on mobile?",
    answer:
      "Yes, Water Down is fully responsive and works on all devices. A dedicated mobile app is coming soon.",
  },
];

export default function FAQsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about Water Down
        </p>
      </div>

      <Card className="p-6">
        <Accordion type="single" collapsible className="space-y-2">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
