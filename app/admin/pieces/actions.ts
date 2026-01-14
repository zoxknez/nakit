'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function createPiece(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const categoryKey = formData.get('categoryKey') as string;
  const priceString = formData.get('price') as string;
  const price = priceString ? parseFloat(priceString) : null;
  const files = formData.getAll('files') as File[];

  // Upload images to Vercel Blob
  const mediaUrls: string[] = [];
  for (const file of files) {
    if (file.size > 0) {
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      });
      mediaUrls.push(blob.url);
    }
  }

  // Get translations
  const srTitle = formData.get('srTitle') as string;
  const srDescription = formData.get('srDescription') as string;
  const srCategory = formData.get('srCategory') as string;

  const ruTitle = formData.get('ruTitle') as string;
  const ruDescription = formData.get('ruDescription') as string;
  const ruCategory = formData.get('ruCategory') as string;

  const enTitle = formData.get('enTitle') as string;
  const enDescription = formData.get('enDescription') as string;
  const enCategory = formData.get('enCategory') as string;

  const publishedLocales: string[] = [];
  const translations: any[] = [];

  if (srTitle && srDescription && srCategory) {
    publishedLocales.push('sr');
    translations.push({
      locale: 'sr',
      title: srTitle,
      description: srDescription,
      categoryName: srCategory,
    });
  }

  if (ruTitle && ruDescription && ruCategory) {
    publishedLocales.push('ru');
    translations.push({
      locale: 'ru',
      title: ruTitle,
      description: ruDescription,
      categoryName: ruCategory,
    });
  }

  if (enTitle && enDescription && enCategory) {
    publishedLocales.push('en');
    translations.push({
      locale: 'en',
      title: enTitle,
      description: enDescription,
      categoryName: enCategory,
    });
  }

  // Create piece
  await prisma.jewelryPiece.create({
    data: {
      categoryKey,
      mediaUrls,
      price,
      publishedLocales,
      translations: {
        create: translations,
      },
    },
  });

  revalidatePath('/admin');
  redirect('/admin');
}

export async function updatePiece(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const categoryKey = formData.get('categoryKey') as string;
  const priceString = formData.get('price') as string;
  const price = priceString ? parseFloat(priceString) : null;
  const files = formData.getAll('files') as File[];
  const existingUrls = formData.get('existingUrls') as string;

  // Parse existing URLs
  let mediaUrls = existingUrls ? JSON.parse(existingUrls) : [];

  // Upload new images
  for (const file of files) {
    if (file.size > 0) {
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      });
      mediaUrls.push(blob.url);
    }
  }

  // Get translations
  const srTitle = formData.get('srTitle') as string;
  const srDescription = formData.get('srDescription') as string;
  const srCategory = formData.get('srCategory') as string;

  const ruTitle = formData.get('ruTitle') as string;
  const ruDescription = formData.get('ruDescription') as string;
  const ruCategory = formData.get('ruCategory') as string;

  const enTitle = formData.get('enTitle') as string;
  const enDescription = formData.get('enDescription') as string;
  const enCategory = formData.get('enCategory') as string;

  const publishedLocales: string[] = [];

  // Delete existing translations
  await prisma.jewelryTranslation.deleteMany({
    where: { pieceId: id },
  });

  const translations: any[] = [];

  if (srTitle && srDescription && srCategory) {
    publishedLocales.push('sr');
    translations.push({
      locale: 'sr',
      title: srTitle,
      description: srDescription,
      categoryName: srCategory,
    });
  }

  if (ruTitle && ruDescription && ruCategory) {
    publishedLocales.push('ru');
    translations.push({
      locale: 'ru',
      title: ruTitle,
      description: ruDescription,
      categoryName: ruCategory,
    });
  }

  if (enTitle && enDescription && enCategory) {
    publishedLocales.push('en');
    translations.push({
      locale: 'en',
      title: enTitle,
      description: enDescription,
      categoryName: enCategory,
    });
  }

  // Update piece
  await prisma.jewelryPiece.update({
    where: { id },
    data: {
      categoryKey,
      mediaUrls,
      price,
      publishedLocales,
      translations: {
        create: translations,
      },
    },
  });

  revalidatePath('/admin');
  revalidatePath(`/sr/gallery/${id}`);
  revalidatePath(`/ru/gallery/${id}`);
  revalidatePath(`/en/gallery/${id}`);
  redirect('/admin');
}

export async function deletePiece(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  await prisma.jewelryPiece.delete({
    where: { id },
  });

  revalidatePath('/admin');
  redirect('/admin');
}
