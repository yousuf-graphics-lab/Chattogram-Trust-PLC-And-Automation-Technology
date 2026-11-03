import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { SITE, WA_INQUIRY_BN, waLink } from '@/lib/site';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink(WA_INQUIRY_BN)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-md bg-whatsapp text-white shadow-card sm:right-6"
      aria-label={`Chat on WhatsApp: ${SITE.phoneDisplay}`}
      title="WhatsApp Inquiry"
    >
      <MessageCircle size={22} />
    </motion.a>
  );
}
