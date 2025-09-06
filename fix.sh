#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "➡️ تحديث الحزم الأساسية..."
pkg update -y >/dev/null || true

echo "➡️ التأكد من تثبيت Node LTS و Git..."
pkg install -y nodejs-lts git

echo "➡️ تعطيل إنشاء الروابط الرمزية في npm (حلّ ترمكس)..."
npm config set bin-links false

echo "➡️ تنظيف المشروع..."
rm -rf node_modules
rm -f package-lock.json
npm cache clean --force

echo "➡️ تثبيت الاعتمادات..."
npm install --no-bin-links
npm install --save-dev prisma --no-bin-links
npm install @prisma/client --no-bin-links

echo "➡️ فحص مخطط Prisma..."
PRISMA_OK=1
npx prisma validate || PRISMA_OK=0
if [ "$PRISMA_OK" -eq 0 ]; then
  echo "❌ مخطط Prisma فيه أخطاء تحقق. افتح prisma/schema.prisma والصق النسخة القياسية الموضحة أدناه."
  exit 1
fi

echo "➡️ توليد Prisma Client..."
npx prisma generate

if grep -q "DATABASE_URL" .env 2>/dev/null; then
  echo "➡️ تطبيق المايغريشن..."
  npx prisma migrate deploy || npx prisma db push
else
  echo "⚠️ لم أجد .env فيه DATABASE_URL — سيتم تجاوز خطوة المايغريشن."
fi

echo "✅ تمّ كل شيء. لتشغيل المشروع:"
echo "   npm run dev"
