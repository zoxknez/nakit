'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export async function createPiece(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  let pieceId: string | null = null;

  try {
    const categoryKey = formData.get('categoryKey') as string;
    const priceString = formData.get('price') as string;
    const priceValue = parseFloat(priceString);
    const price = isNaN(priceValue) ? null : priceValue;
    const files = formData.getAll('files') as File[];

    console.log('--- FORGING NEW MASTERPIECE ---');

    // Upload images to Vercel Blob
    const mediaUrls: string[] = [];
    for (const file of files) {
      if (file && file.size > 0) {
        try {
          const blob = await put(file.name, file, {
            access: 'public',
            addRandomSuffix: true,
          });
          mediaUrls.push(blob.url);
        } catch (uploadError) {
          console.error('Blob Upload Error:', uploadError);
          return { success: false, error: `Failed to upload image: ${file.name}` };
        }
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
      translations.push({ locale: 'sr', title: srTitle, description: srDescription, categoryName: srCategory });
    }
    if (ruTitle && ruDescription && ruCategory) {
      publishedLocales.push('ru');
      translations.push({ locale: 'ru', title: ruTitle, description: ruDescription, categoryName: ruCategory });
    }
    if (enTitle && enDescription && enCategory) {
      publishedLocales.push('en');
      translations.push({ locale: 'en', title: enTitle, description: enDescription, categoryName: enCategory });
    }

    // Create piece in a transaction
    const piece = await prisma.$transaction(async (tx) => {
      return await tx.jewelryPiece.create({
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
    });

    pieceId = piece.id;
    console.log('--- MASTERPIECE FORGED SUCCESSFULLY ---');

    revalidatePath('/admin');
    revalidatePath('/[locale]/gallery', 'page');

    return { success: true };
  } catch (error: any) {
    console.error('SERVER ACTION ERROR (FORGE):', error);
    return { success: false, error: error.message || 'The forge failed to materialize the masterpiece.' };
  }
}

export async function updatePiece(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const categoryKey = formData.get('categoryKey') as string;
    const priceString = formData.get('price') as string;
    const priceValue = parseFloat(priceString);
    const price = isNaN(priceValue) ? null : priceValue;
    const files = formData.getAll('files') as File[];
    const existingUrls = formData.get('existingUrls') as string;

    console.log('--- REFINING MASTERPIECE ---', id);

    // Parse existing URLs
    let mediaUrls = existingUrls ? JSON.parse(existingUrls) : [];

    // Upload new images
    for (const file of files) {
      if (file && file.size > 0) {
        try {
          const blob = await put(file.name, file, {
            access: 'public',
            addRandomSuffix: true,
          });
          mediaUrls.push(blob.url);
        } catch (uploadError) {
          console.error('Blob Upload Error (Update):', uploadError);
          return { success: false, error: `Failed to upload new image: ${file.name}` };
        }
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
      translations.push({ locale: 'sr', title: srTitle, description: srDescription, categoryName: srCategory });
    }
    if (ruTitle && ruDescription && ruCategory) {
      publishedLocales.push('ru');
      translations.push({ locale: 'ru', title: ruTitle, description: ruDescription, categoryName: ruCategory });
    }
    if (enTitle && enDescription && enCategory) {
      publishedLocales.push('en');
      translations.push({ locale: 'en', title: enTitle, description: enDescription, categoryName: enCategory });
    }

    // Update piece in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete existing translations
      await tx.jewelryTranslation.deleteMany({
        where: { pieceId: id },
      });

      // Update basic info and recreate translations
      await tx.jewelryPiece.update({
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
    });

    console.log('--- MASTERPIECE REFINED SUCCESSFULLY ---');

    revalidatePath('/admin');
    revalidatePath(`/[locale]/gallery/${id}`, 'page');
    revalidatePath('/[locale]/gallery', 'page');

    return { success: true };
  } catch (error: any) {
    console.error('SERVER ACTION ERROR (REFINE):', error);
    return { success: false, error: error.message || 'The refinement process failed.' };
  }
}

export async function deletePiece(id: string) {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.jewelryPiece.delete({
      where: { id },
    });
    console.log('--- MASTERPIECE BANISHED ---', id);

    revalidatePath('/admin');
    revalidatePath('/[locale]/gallery', 'page');

    return { success: true };
  } catch (error: any) {
    console.error('SERVER ACTION ERROR (BANISH):', error);
    return { success: false, error: 'Could not banish this piece from the collection.' };
  }
}
