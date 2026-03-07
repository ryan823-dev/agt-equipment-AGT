'use client';

import { useAI } from '@/lib/ai-context';
import { AIChatPanel } from './AIChatPanel';
import { ConsultationIntroScreen } from './ConsultationIntroScreen';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface AIChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIChatDrawer({ open, onOpenChange }: AIChatDrawerProps) {
  const { hasStarted, resetChat } = useAI();

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    // Reset state when drawer closes
    if (!open) {
      setTimeout(() => {
        resetChat();
      }, 300);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col"
      >
        {hasStarted ? (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
              <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                AGT AI Consultant
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                AI provides preliminary guidance · Our team verifies all technical details
              </SheetDescription>
            </SheetHeader>
            <AIChatPanel />
          </>
        ) : (
          <ConsultationIntroScreen />
        )}
      </SheetContent>
    </Sheet>
  );
}
