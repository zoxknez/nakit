import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@njatashiz.com' },
    update: {},
    create: {
      email: 'admin@njatashiz.com',
      password: hashedPassword,
      name: 'Tanja Novković',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create demo jewelry pieces
  const demoImages = [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
  ];

  // Necklace 1
  const necklace1 = await prisma.jewelryPiece.create({
    data: {
      categoryKey: 'necklaces',
      price: 4500,
      mediaUrls: [demoImages[0]],
      publishedLocales: ['sr', 'ru', 'en'],
      translations: {
        create: [
          {
            locale: 'sr',
            title: 'Geometrijska ogrlica',
            description: 'Ručno izrađena kožna ogrlica sa geometrijskim oblicima i jarkim bojama. Svaki komad je jedinstven i nema dva ista.',
            categoryName: 'Ogrlice',
          },
          {
            locale: 'ru',
            title: 'Геометрическое ожерелье',
            description: 'Ручное работанное кожаное ожерелье с геометрическими формами и яркими цветами. Каждое изделие уникально, двух одинаковых не существует.',
            categoryName: 'Ожерелья',
          },
          {
            locale: 'en',
            title: 'Geometric Necklace',
            description: 'Handcrafted leather necklace with geometric shapes and vibrant colors. Each piece is unique and no two are alike.',
            categoryName: 'Necklaces',
          },
        ],
      },
    },
  });

  // Bracelet 1
  const bracelet1 = await prisma.jewelryPiece.create({
    data: {
      categoryKey: 'bracelets',
      price: 3200,
      mediaUrls: [demoImages[1]],
      publishedLocales: ['sr', 'ru', 'en'],
      translations: {
        create: [
          {
            locale: 'sr',
            title: 'Široka statement narukvica',
            description: 'Upadljiva široka kožna narukvica sa 3D efektom i ručnim šivovima. Pravi statement komad za moderne žene.',
            categoryName: 'Narukvice',
          },
          {
            locale: 'ru',
            title: 'Широкий браслет',
            description: 'Эффектный широкий кожаный браслет с 3D эффектом и ручными швами. Настоящее украшение для современных женщин.',
            categoryName: 'Браслеты',
          },
          {
            locale: 'en',
            title: 'Wide Statement Bracelet',
            description: 'Eye-catching wide leather bracelet with 3D effect and hand stitching. A true statement piece for modern women.',
            categoryName: 'Bracelets',
          },
        ],
      },
    },
  });

  // Statement piece 1
  const statement1 = await prisma.jewelryPiece.create({
    data: {
      categoryKey: 'statement',
      price: 7800,
      mediaUrls: [demoImages[2]],
      publishedLocales: ['sr', 'ru', 'en'],
      translations: {
        create: [
          {
            locale: 'sr',
            title: 'Cvetni statement set',
            description: 'Set ogrlice i narukvice sa cvetnim motivima i jakim bojama. Savršen za žene koje ne vole dosadno.',
            categoryName: 'Statement Komadi',
          },
          {
            locale: 'ru',
            title: 'Цветочный набор',
            description: 'Набор ожерелья и браслета с цветочными мотивами и яркими цветами. Идеален для женщин, которые не любят скучное.',
            categoryName: 'Эффектные Изделия',
          },
          {
            locale: 'en',
            title: 'Floral Statement Set',
            description: 'Necklace and bracelet set with floral motifs and bold colors. Perfect for women who don\'t like boring.',
            categoryName: 'Statement Pieces',
          },
        ],
      },
    },
  });

  // Additional pieces
  const necklace2 = await prisma.jewelryPiece.create({
    data: {
      categoryKey: 'necklaces',
      price: 4200,
      mediaUrls: [demoImages[0]],
      publishedLocales: ['sr', 'ru', 'en'],
      translations: {
        create: [
          {
            locale: 'sr',
            title: 'Teksturna ogrlica',
            description: 'Ogrlica sa interesantnom teksturom kože i inovativnim dizajnom. Proces izrade traje 3 dana.',
            categoryName: 'Ogrlice',
          },
          {
            locale: 'ru',
            title: 'Текстурное ожерелье',
            description: 'Ожерелье с интересной текстурой кожи и инновационным дизайном. Процесс изготовления занимает 3 дня.',
            categoryName: 'Ожерелья',
          },
          {
            locale: 'en',
            title: 'Textured Necklace',
            description: 'Necklace with interesting leather texture and innovative design. The creation process takes 3 days.',
            categoryName: 'Necklaces',
          },
        ],
      },
    },
  });

  const bracelet2 = await prisma.jewelryPiece.create({
    data: {
      categoryKey: 'bracelets',
      price: 2800,
      mediaUrls: [demoImages[1]],
      publishedLocales: ['sr', 'ru', 'en'],
      translations: {
        create: [
          {
            locale: 'sr',
            title: 'Geometrijska narukvica',
            description: 'Narukvica geometrijskog oblika sa ručnim oslikavanjem. Boje za kožu i fiksator za dugotrajnost.',
            categoryName: 'Narukvice',
          },
          {
            locale: 'ru',
            title: 'Геометрический браслет',
            description: 'Браслет геометрической формы с ручной росписью. Краски для кожи и фиксатор для долговечности.',
            categoryName: 'Браслеты',
          },
          {
            locale: 'en',
            title: 'Geometric Bracelet',
            description: 'Geometric-shaped bracelet with hand painting. Leather paints and fixative for durability.',
            categoryName: 'Bracelets',
          },
        ],
      },
    },
  });

  const statement2 = await prisma.jewelryPiece.create({
    data: {
      categoryKey: 'statement',
      price: 9500,
      mediaUrls: [demoImages[2]],
      publishedLocales: ['sr', 'ru', 'en'],
      translations: {
        create: [
          {
            locale: 'sr',
            title: 'Unikat statement nakit',
            description: 'Potpuno jedinstven komad koji se izdvaja iz klasičnih formi. Za žene koje vole da se razlikuju.',
            categoryName: 'Statement Komadi',
          },
          {
            locale: 'ru',
            title: 'Уникальное украшение',
            description: 'Совершенно уникальное изделие, выделяющееся из классических форм. Для женщин, которые любят отличаться.',
            categoryName: 'Эффектные Изделия',
          },
          {
            locale: 'en',
            title: 'Unique Statement Piece',
            description: 'Completely unique piece that stands out from classic forms. For women who love to be different.',
            categoryName: 'Statement Pieces',
          },
        ],
      },
    },
  });

  console.log('✅ Created 6 demo jewelry pieces');
  console.log('🎉 Seeding completed!');
  console.log('\n📧 Admin login:');
  console.log('   Email: admin@njatashiz.com');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
