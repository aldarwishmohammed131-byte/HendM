#!/data/data/com.termux/files/usr/bin/bash

echo "🔄 تثبيت الحزم..."
npm install

echo "⚡ توليد Prisma Client..."
npx prisma generate

echo "🛠️ ترحيل قاعدة البيانات..."
npx prisma migrate deploy || npx prisma db push

echo "🚀 بناء المشروع..."
npm run build

echo "▶️ تشغيل المشروع محليًا..."
npm run dev

