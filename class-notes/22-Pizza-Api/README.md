# 🛠️ Git & VS Code Geliştirici Rehberi

> Commit standartları, Git komutları ve VS Code kullanımı için tek kaynak döküman.

---

## 📑 İçindekiler

- [Git Kurulum & Yapılandırma](#-git-kurulum--yapılandırma)
- [Temel Git Komutları](#-temel-git-komutları)
- [Branch Yönetimi](#-branch-yönetimi)
- [Uzak Repo (GitHub)](#-uzak-repo-github)
- [Commit Mesajı Standardı](#-commit-mesajı-standardı)
- [.gitignore](#-gitignore)
- [VS Code Git Entegrasyonu](#-vs-code-git-entegrasyonu)
- [VS Code Kısayolları](#-vs-code-kısayolları)
- [Önerilen VS Code Eklentileri](#-önerilen-vs-code-eklentileri)

---

## ⚙️ Git Kurulum & Yapılandırma

```bash
# Kimlik tanımlama (ilk kurulumda bir kere yapılır)
git config --global user.name  "Adın Soyadın"
git config --global user.email "email@ornek.com"

# Varsayılan branch adını main yap
git config --global init.defaultBranch main

# Yapılandırmayı kontrol et
git config --list
```

---

## 📦 Temel Git Komutları

### Repo Başlatma

```bash
git init                        # mevcut klasörde yeni repo oluştur
git clone <url>                 # uzak repoyu klonla
git clone <url> klasor-adi      # belirli isimle klonla
```

### Durum & Geçmiş

```bash
git status                      # değişiklikleri göster
git log                         # commit geçmişi (detaylı)
git log --oneline               # commit geçmişi (özet)
git log --oneline --graph       # branch grafiğiyle göster
git diff                        # stage edilmemiş değişiklikler
git diff --staged               # stage edilmiş değişiklikler
```

### Stage & Commit

```bash
git add .                       # tüm değişiklikleri stage et
git add <dosya>                 # belirli dosyayı stage et
git add src/                    # klasördeki her şeyi stage et

git commit -m "feat: add login" # commit yaz
git commit --amend              # son commit'i düzenle (push öncesi)
```

### Geri Alma

```bash
git restore <dosya>             # stage edilmemiş değişikliği geri al
git restore --staged <dosya>    # stage'den geri çek (commit olmaz)
git revert <commit-hash>        # commit'i geri alan yeni commit yaz
git reset --soft HEAD~1         # son commit'i geri al, değişiklikler kalır
git reset --hard HEAD~1         # son commit + değişiklikleri tamamen sil ⚠️
```

---

## 🌿 Branch Yönetimi

```bash
git branch                      # branch listesi
git branch <isim>               # yeni branch oluştur
git switch <isim>               # branch'e geç
git switch -c <isim>            # oluştur ve geç (kısayol)
git branch -d <isim>            # branch sil (merge edilmişse)
git branch -D <isim>            # branch zorla sil ⚠️

git merge <isim>                # branch'i mevcut branch'e merge et
git rebase <isim>               # rebase yap (ileri düzey)
```

### Branch İsimlendirme Önerileri

```
feature/user-auth
feature/mail-integration
fix/smtp-login-error
hotfix/order-crash
release/v1.2.0
```

---

## 🌐 Uzak Repo (GitHub)

```bash
# Remote bağlantısı
git remote add origin <url>         # uzak repo ekle
git remote -v                       # bağlı remote'ları göster
git remote set-url origin <url>     # remote URL güncelle

# Push & Pull
git push origin main                # main branch'i gönder
git push origin <branch>            # belirli branch'i gönder
git push -u origin <branch>         # takip ayarıyla gönder (ilk kez)
git push --force-with-lease         # zorla push (güvenli yol) ⚠️

git pull                            # fetch + merge
git pull origin main                # main'den çek
git fetch origin                    # değişiklikleri çek (merge etme)

# PR öncesi senkronizasyon
git fetch origin
git rebase origin/main
```

### GitHub SSH Kurulumu

```bash
ssh-keygen -t ed25519 -C "email@ornek.com"
cat ~/.ssh/id_ed25519.pub           # çıktıyı GitHub > Settings > SSH Keys'e ekle
ssh -T git@github.com               # bağlantıyı test et
```

---

## 📝 Commit Mesajı Standardı

> Temel alınan standart: **[Conventional Commits v1.0.0](https://www.conventionalcommits.org/)**

### Format

```
<type>(<scope>): <subject>

[body]

[footer]
```

### Type Listesi

| Type | Ne Zaman | Örnek |
|------|----------|-------|
| `feat` | Yeni özellik | `feat(auth): add JWT login` |
| `fix` | Bug düzeltme | `fix(mail): resolve SMTP auth error` |
| `refactor` | Kod düzenleme (davranış değişmez) | `refactor(user): simplify password hash` |
| `chore` | Bağımlılık, config değişikliği | `chore: install nodemailer` |
| `docs` | Sadece dokümantasyon | `docs: update API readme` |
| `test` | Test ekleme/düzenleme | `test(auth): add login unit tests` |
| `style` | Formatting (kod değişmez) | `style: fix indentation` |
| `perf` | Performans iyileştirmesi | `perf(db): add index to users` |
| `ci` | CI/CD pipeline | `ci: add github actions workflow` |
| `revert` | Commit geri alma | `revert: feat(auth): add JWT login` |

### Scope Örnekleri

```
auth    → kimlik doğrulama        mail    → e-posta işlemleri
user    → kullanıcı modülü        order   → sipariş modülü
db      → veritabanı              config  → konfigürasyon
api     → genel API katmanı
```

### ✅ İyi Örnekler

```bash
feat(mail): add nodemailer email sending with ethereal SMTP

fix(auth): resolve token expiration not being checked

chore: install express-validator and dotenv

feat(user): add password reset via email

- generate secure reset token with crypto
- send reset link via nodemailer
- token expires in 1 hour
- hash token before saving to DB

Closes #42
```

### ❌ Kötü Örnekler

```bash
update          # ne güncellendi?
fix             # ne düzeltildi?
wip             # yarım iş commit edilmez
değişiklikler   # çok belirsiz
mail eklendi    # type yok, scope yok
```

### Kurallar

1. Subject satırı **max 72 karakter**
2. **Türkçe veya İngilizce** — proje başında karar ver, karıştırma
3. Subject fiil ile başlar: `add login` ✅ &nbsp; `added login` ❌
4. Body ile subject arasında **boş satır** bırakılır
5. Body **neden** sorusunu cevaplar, neyi değil

### Breaking Change

```bash
feat(api): change user endpoint response format

BREAKING CHANGE: `name` and `surname` fields removed.
Use `fullName` instead.
```

---

## 🚫 .gitignore

Projenin kök dizinine `.gitignore` dosyası ekle:

```gitignore
# Bağımlılıklar
node_modules/

# Ortam değişkenleri — asla commit etme!
.env
.env.local
.env.production

# Log dosyaları
logs/
*.log
npm-debug.log*

# Build çıktıları
dist/
build/

# OS dosyaları
.DS_Store
Thumbs.db

# VS Code
.vscode/settings.json

# Test coverage
coverage/
```

> 💡 Hazır şablonlar için: [gitignore.io](https://www.toptal.com/developers/gitignore)

---

## 🖥️ VS Code Git Entegrasyonu

### Source Control Paneli

```
Ctrl + Shift + G    → Source Control panelini aç
```

Panel üzerinden:
- ✅ Dosyaları stage et (`+` ikonu)
- ✅ Commit mesajı yaz ve commit at
- ✅ Branch oluştur / değiştir (alt bar)
- ✅ Push / Pull (alt bar senkronizasyon ikonu)

### Terminal ile Çalışma

```
Ctrl + `            → entegre terminali aç/kapat
Ctrl + Shift + `    → yeni terminal sekmesi
```

### Faydalı Ayarlar (`settings.json`)

```json
{
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

> **settings.json** aç: `Ctrl + Shift + P` → "Open User Settings JSON"

---

## ⌨️ VS Code Kısayolları

### Genel

| Kısayol | Açıklama |
|---------|----------|
| `Ctrl + Shift + P` | Komut paleti |
| `Ctrl + P` | Hızlı dosya aç |
| `Ctrl + ,` | Ayarlar |
| `Ctrl + B` | Sol panel aç/kapat |
| `Ctrl + \`` | Terminal aç/kapat |

### Düzenleme

| Kısayol | Açıklama |
|---------|----------|
| `Alt + ↑ / ↓` | Satırı yukarı/aşağı taşı |
| `Shift + Alt + ↓` | Satırı kopyala |
| `Ctrl + D` | Aynı kelimeyi seç (çoklu imleç) |
| `Ctrl + /` | Satırı yorum yap |
| `Ctrl + Shift + K` | Satırı sil |
| `F2` | Değişken/fonksiyon yeniden adlandır |
| `Ctrl + Space` | Intellisense tetikle |

### Git

| Kısayol | Açıklama |
|---------|----------|
| `Ctrl + Shift + G` | Source Control paneli |
| `Ctrl + Enter` | (Source Control'de) Commit at |

---

## 🧩 Önerilen VS Code Eklentileri

### Geliştirme

| Eklenti | Açıklama |
|---------|----------|
| **ESLint** | JavaScript hata kontrolü |
| **Prettier** | Otomatik kod formatlama |
| **Path Intellisense** | Dosya yolu tamamlama |
| **Auto Rename Tag** | HTML tag otomatik yeniden adlandırma |
| **DotENV** | `.env` dosyası renklendirme |
| **REST Client** | `.http` dosyasıyla API test |

### Git

| Eklenti | Açıklama |
|---------|----------|
| **GitLens** | Satır bazlı commit geçmişi, blame |
| **Git Graph** | Görsel branch ve commit grafiği |
| **Conventional Commits** | Commit mesajı yazma yardımcısı |

### Görünüm

| Eklenti | Açıklama |
|---------|----------|
| **Material Icon Theme** | Dosya ikonları |
| **One Dark Pro** | Popüler koyu tema |
| **indent-rainbow** | Girinti renklendir |

---

## 🔧 Commitlint + Husky Kurulumu (Opsiyonel)

Commit mesajlarını otomatik kontrol etmek için:

```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional

# commitlint config
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# husky başlat
npx husky init

# commit-msg hook ekle
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```

Artık kurallara uymayan her commit otomatik reddedilir.

---

## 📋 Hızlı Referans

```
# Günlük iş akışı
git status                          → duruma bak
git add .                           → stage et
git commit -m "feat: ..."           → commit at
git push origin <branch>            → gönder

# Branch açıp PR hazırlama
git switch -c feature/yeni-ozellik  → yeni branch
... kod yaz, commit at ...
git push -u origin feature/yeni-ozellik → GitHub'a gönder, PR aç

# Commit type'ları
feat fix refactor chore docs test style perf ci revert
```

---

*Conventional Commits: [conventionalcommits.org](https://www.conventionalcommits.org) &nbsp;|&nbsp; Git Docs: [git-scm.com](https://git-scm.com/doc)*