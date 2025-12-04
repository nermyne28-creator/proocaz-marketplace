import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().min(2),
  siret: z.string().optional(),
  role: z.enum(['buyer', 'seller', 'both']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createListingSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['informatique', 'logistique', 'btp', 'industrie', 'mobilier', 'autre']),
  price: z.string().or(z.number()).transform((v) => Number(v)).refine((n) => !Number.isNaN(n) && n > 0, {
    message: 'Prix invalide',
  }),
  condition: z.enum(['excellent', 'good', 'fair']).optional(),
  location: z.string().max(200).optional(),
});

export const updateListingSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  category: z.enum(['informatique', 'logistique', 'btp', 'industrie', 'mobilier', 'autre']).optional(),
  price: z.number().positive().optional(),
  condition: z.enum(['excellent', 'good', 'fair']).optional(),
  location: z.string().max(200).optional(),
});

export const sendMessageSchema = z.object({
  receiverId: z.string().min(1),
  listingId: z.string().optional(),
  content: z.string().min(1).max(2000),
});

export const updateTransactionStatusSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'canceled']),
});

