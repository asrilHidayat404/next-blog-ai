// import { PrismaClient } from "@prisma/client";
// import { hf } from "@/lib/hf"; // pastikan path sesuai proyekmu

// const prisma = new PrismaClient();

// const postsData = [
//   // Context 1: Kesehatan
//   {
//     context: "Kesehatan",
//     items: [
//       { title: "Manfaat Jalan Pagi", content: "Jalan pagi meningkatkan stamina tubuh dan mengurangi stres harian." },
//       { title: "Menu Sarapan Sehat", content: "Sarapan seimbang penting untuk energi dan konsentrasi sepanjang hari." },
//       { title: "Yoga untuk Pemula", content: "Latihan yoga rutin membantu fleksibilitas tubuh dan ketenangan pikiran." },
//     ],
//   },
//   // Context 2: Teknologi
//   {
//     context: "Teknologi",
//     items: [
//       { title: "Kecerdasan Buatan", content: "AI membantu manusia mengotomatisasi tugas dan analisis data kompleks." },
//       { title: "Robot Pintar", content: "Robot modern mempermudah pekerjaan rumah dan industri secara efektif." },
//       { title: "Internet of Things", content: "Perangkat IoT menghubungkan rumah dan kantor secara cerdas." },
//     ],
//   },
//   // Context 3: Budaya
//   {
//     context: "Budaya",
//     items: [
//       { title: "Festival Musik Nusantara", content: "Musisi tampil di panggung, pengunjung menikmati musik sepanjang malam." },
//       { title: "Upacara Adat Desa", content: "Warga merayakan tradisi turun-temurun dengan tarian dan doa bersama." },
//       { title: "Pameran Seni Lukis", content: "Seniman memamerkan karya kreatif, pengunjung belajar inspirasi visual." },
//     ],
//   },
//   // Context 4: Pendidikan
//   {
//     context: "Pendidikan",
//     items: [
//       { title: "Belajar Online", content: "Platform digital mempermudah siswa mengakses materi pendidikan interaktif." },
//       { title: "Perpustakaan Digital", content: "E-book dan jurnal mempermudah penelitian dan pembelajaran siswa." },
//       { title: "Workshop Kreatif", content: "Siswa belajar keterampilan baru melalui kegiatan praktek langsung seru." },
//     ],
//   },
//   // Context 5: Lingkungan
//   {
//     context: "Lingkungan",
//     items: [
//       { title: "Revolusi Hijau", content: "Petani gunakan teknologi cerdas meningkatkan hasil panen mereka." },
//       { title: "Pantai Bersih", content: "Komunitas lokal membersihkan pantai untuk ekosistem lebih sehat." },
//       { title: "Daur Ulang Sampah", content: "Masyarakat diajarkan memisahkan sampah untuk mendukung lingkungan." },
//     ],
//   },
// ];

// async function main() {
//   for (const context of postsData) {
//     for (const item of context.items) {
//       // Generate embedding dari title + content
//       const text = `${item.title} ${item.content}`;
//       const embeddingResponse = await hf.featureExtraction({
//         model: "sentence-transformers/all-MiniLM-L6-v2",
//         inputs: text,
//       });
//       const embedding = Array.isArray(embeddingResponse[0])
//         ? embeddingResponse[0]
//         : embeddingResponse;

//       // Simpan ke database
//       await prisma.post.create({
//         data: {
//           title: item.title,
//           content: item.content,
//           embedding: embedding as any,
//           image: "", // bisa dikosongkan atau diisi path default
//           userId: "cmfse6afw0000ny8o1nysh7me", // ganti sesuai user default
//         },
//       });

//       console.log(`✅ Post created: ${item.title}`);
//     }
//   }

//   console.log("✅ All posts seeded successfully!");
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error("❌ Error seeding posts:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient } from "@prisma/client";
import { hf } from "@/lib/hf";

const prisma = new PrismaClient();

const contexts = [
  { context: "Kesehatan", keywords: ["Yoga", "Jalan Pagi", "Sarapan Sehat", "Stamina", "Tidur"] },
  { context: "Teknologi", keywords: ["AI", "Robot", "IoT", "Komputer", "Smartphone"] },
  { context: "Budaya", keywords: ["Festival", "Upacara", "Pameran", "Tarian", "Musik"] },
  { context: "Pendidikan", keywords: ["Belajar", "Workshop", "Perpustakaan", "Siswa", "E-book"] },
  { context: "Lingkungan", keywords: ["Pantai", "Daur Ulang", "Revolusi Hijau", "Komunitas", "Ekosistem"] },
];

function generatePost(titleKeyword: string, contentKeyword: string, index: number) {
  return {
    title: `${titleKeyword} ${index}`,
    content: `${contentKeyword} membantu meningkatkan pemahaman dan pengalaman praktis.`,
  };
}

async function main() {
  for (const ctx of contexts) {
    for (let i = 1; i <= 20; i++) { // 20 post per context
      const titleKeyword = ctx.keywords[i % ctx.keywords.length];
      const contentKeyword = ctx.keywords[(i + 1) % ctx.keywords.length];

      const post = generatePost(titleKeyword, contentKeyword, i);

      const text = `${post.title} ${post.content}`;
      const embeddingResponse = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: text,
      });
      const embedding = Array.isArray(embeddingResponse[0])
        ? embeddingResponse[0]
        : embeddingResponse;

      await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          embedding: embedding as any,
          image: "posts/default.jpg",
          userId: "cmfse6afw0000ny8o1nysh7me",
        },
      });

      console.log(`✅ Post created: ${post.title}`);
    }
  }

  console.log("✅ 100 posts seeded successfully!");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error seeding posts:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
