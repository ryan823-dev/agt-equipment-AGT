'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAI } from '@/lib/ai-context';
import { AIChatDrawer } from './AIChatDrawer';

export function FloatingAssistantButton() {
  const { isOpen, openChat, closeChat } = useAI();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  // Detect when user scrolls past hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section');
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        setPastHero(window.scrollY > heroBottom - 200);
      } else {
        // If no hero section, show button after 300px scroll
        setPastHero(window.scrollY > 300);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation check
  useEffect(() => {
    const animated = sessionStorage.getItem('assistant-animated');
    if (!animated) {
      sessionStorage.setItem('assistant-animated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  // Show button when scrolled past hero and chat is not open
  const showButton = pastHero && !isOpen;

  return (
    <>
      {/* Floating CTA Button */}
      <AnimatePresence>
        {!isOpen && pastHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)]"
          >
            <motion.div
              initial={!hasAnimated ? { scale: 1 } : false}
              animate={!hasAnimated ? { scale: [1, 1.03, 1] } : {}}
              transition={!hasAnimated ? { duration: 2, repeat: 1, ease: 'easeInOut' } : {}}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <Button
                onClick={() => openChat()}
                className={cn(
                  'h-auto py-3.5 px-6 rounded-full',
                  'bg-primary hover:bg-primary/90',
                  'text-primary-foreground font-semibold text-sm',
                  'shadow-lg hover:shadow-xl',
                  'transition-all duration-200',
                  'gap-2'
                )}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">AI Consultant</span>
                <span className="sm:hidden">Chat</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close button when drawer is open (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 sm:hidden"
          >
            <Button
              onClick={() => closeChat()}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg bg-background"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Drawer */}
      <AIChatDrawer
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeChat();
        }}
      />
    </>
  );
}
