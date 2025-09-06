#!/data/data/com.termux/files/usr/bin/bash
set -e

log(){ printf "\n\033[1;32m==> %s\033[0m\n" "$1"; }
warn(){ printf "\n\033[1;33m[!] %s\033[0m\n" "$1"; }

# 1) تحديث النظام وأساسيات البناء + Node LTS
log "تحديث الحِزم وتثبيت المتطلبات (git, nodejs-lts, python, libicu, c-ares)..."
pkg update -y && pkg upgrade -y
pkg install -y git nodejs-lts python libicu c-ares

# 2) طباعة نسخ Node/NPM
node -v || true
npm -v || true

# 3) تثبيت حِزم المشروع
log "تثبيت حِزم NPM للمشروع..."
if [ -f package-lock.json ]; then
  npm ci || npm install
else
  npm install
fi

# 4) توليد Prisma Client
log "تشغيل prisma generate (إن وجد)..."
npx prisma generate || warn "تجاوزنا generate (قد لا تكون Prisma موجودة بعد)."

# 5) قراءة متغيرات .env إن كان موجوداً
if [ -f .env ]; then
  log "قراءة متغيرات البيئة من .env"
  # تحميل المتغيرات إلى البيئة الحالية (تجاهل الأسطر المعلّقة)
  set -o allexport
  grep -v '^\s*#' .env | grep -E '.+=' | sed 's/\r$//' > .env.export.tmp
  . ./.env.export.tmp || true
  rm -f .env.export.tmp
  set +o allexport
else
  warn ".env غير موجود. إذا كنت ستستخدم Prisma/Postgres أضِف DATABASE_URL في .env"
fi

# 6) مهاجرات Prisma إن كان DATABASE_URL معروفاً
if [ -n "$DATABASE_URL" ]; then
  log "تشغيل مهاجرات Prisma على القاعدة..."
  if npx prisma migrate deploy; then
    log "migrate deploy تم بنجاح."
  else
    warn "migrate deploy فشل، سنحاول prisma db push (للبيئات التجريبية)..."
    npx prisma db push || warn "فشل db push كذلك—تأكد من DATABASE_URL وصلاحيات القاعدة."
  fi
else
  warn "DATABASE_URL غير معرّف؛ تخطّينا المهاجرات. أضِف DATABASE_URL ثم أعد التشغيل."
fi

# 7) بناء المشروع
log "تشغيل build..."
npm run build || warn "فشل build—تحقق من الأخطاء أعلاه."

log "كل شيء جاهز ✅
- للتشغيل المحلي:  ./dev.sh  ثم افتح http://localhost:3000
- للنشر على Vercel: استخدم npx vercel أو تطبيق Vercel (بعد ضبط env في Vercel)."
