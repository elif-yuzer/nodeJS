# 🚀 Git & GitHub Ekip Çalışması Rehberi

> Projeye yeni katılan geliştiriciler için kapsamlı Git & GitHub kılavuzu.

---

## 📌 İçindekiler

1. [Git Nedir? GitHub Nedir?](#1-git-nedir-github-nedir)
2. [Kurulum ve İlk Ayarlar](#2-kurulum-ve-ilk-ayarlar)
3. [Temel Kavramlar](#3-temel-kavramlar)
4. [Branch Yapısı](#4-branch-yapısı)
5. [Standart Geliştirme Akışı](#5-standart-geliştirme-akışı)
6. [Commit Mesajları](#6-commit-mesajları)
7. [Pull Request (PR) Süreci](#7-pull-request-pr-süreci)
8. [Code Review](#8-code-review)
9. [Merge ve Conflict Çözme](#9-merge-ve-conflict-çözme)
10. [Sık Kullanılan Komutlar](#10-sık-kullanılan-komutlar)
11. [GitHub Arayüzü](#11-github-arayüzü)
12. [Yeni Task Checklist](#12-yeni-task-checklist)

---

## 1. Git Nedir? GitHub Nedir?

**Git**, kaynak kodunun değişikliklerini takip eden bir versiyon kontrol sistemidir. Bilgisayarında yerel olarak çalışır.

**GitHub**, Git depolarını bulutta barındıran ve ekip çalışmasını kolaylaştıran bir platformdur.

```
Yerel Makine (Git)  ──push──►  GitHub (Uzak Sunucu)
                    ◄──pull──
```

| Terim | Açıklama |
|-------|----------|
| Repository (repo) | Projenin tüm dosya ve geçmişini barındıran klasör |
| Local | Kendi bilgisayarındaki kopya |
| Remote | GitHub'daki kopya (`origin` olarak adlandırılır) |
| Clone | Uzaktaki repoyu bilgisayara indirme |
| Fork | Başkasının reposunu kendi hesabına kopyalama |

---

## 2. Kurulum ve İlk Ayarlar

### Git Kurulumu

```bash
# macOS
brew install git

# Ubuntu/Debian
sudo apt install git

# Windows → https://git-scm.com/download/win
```

### Kimlik Ayarları (Zorunlu)

```bash
git config --global user.name "Adın Soyadın"
git config --global user.email "email@example.com"
```

Bu bilgiler her commit'e otomatik eklenir. Ayarları doğrulamak için:

```bash
git config --list
```

### SSH Key Oluşturma (GitHub için önerilir)

```bash
# Key oluştur
ssh-keygen -t ed25519 -C "email@example.com"

# Public key'i kopyala
cat ~/.ssh/id_ed25519.pub
```

Kopyalanan key'i GitHub → **Settings → SSH and GPG keys → New SSH key** bölümüne yapıştır.

### Repoyu Klonlama

```bash
# HTTPS
git clone https://github.com/kullanici/repo.git

# SSH
git clone git@github.com:kullanici/repo.git

# Klasörün içine gir
cd repo
```

---

## 3. Temel Kavramlar

### Çalışma Alanları

```
Working Directory  →  Staging Area  →  Local Repo  →  Remote (GitHub)
  (dosyaları         (git add)        (git commit)     (git push)
   düzenle)
```

| Alan | Açıklama |
|------|----------|
| Working Directory | Dosyaları düzenlediğin yer |
| Staging Area | Commit'e hazırlanan değişiklikler |
| Local Repo | `git commit` ile kaydedilen geçmiş |
| Remote | GitHub'daki kopya |

### Dosya Durumları

```
Untracked  →  Staged  →  Committed
              (add)       (commit)
     ↑
  Modified  →  Staged
```

```bash
git status        # Dosya durumlarını göster
git diff          # Staged olmayan değişiklikleri göster
git diff --staged # Staged değişiklikleri göster
```

---

## 4. Branch Yapısı

```
main ──────────────────────────────────────────► (production)
  └─ dev ──────────────────────────────────────► (geliştirme)
        ├─ feature/user-api ──────► merge ──►
        ├─ feature/login ─────────► merge ──►
        └─ feature/product-list ──► merge ──►
```

### Branch Açıklamaları

| Branch | Amaç | Kural |
|--------|------|-------|
| `main` | Production kodu | Doğrudan commit yapılmaz |
| `dev` | Ortak geliştirme | Feature branch'ler buraya merge edilir |
| `feature/*` | Yeni özellikler | Her görev için ayrı branch |

### Branch Komutları

```bash
git branch                    # Tüm local branch'leri listele
git branch -a                 # Local + remote tüm branch'ler
git branch -vv                # Branch'lerin remote bağlantılarını göster
git branch feature/user-api   # Yeni branch oluştur (geçiş yapmadan)
git checkout feature/user-api # Branch'e geç
git checkout -b feature/login # Oluştur + geç (kısayol)
git switch feature/login      # Modern alternatif
git branch -d feature/done    # Merge edilmiş branch'i sil
git branch -D feature/force   # Zorla sil (merge edilmemiş olsa da)
```

---

## 5. Standart Geliştirme Akışı

### Adım 1 — Güncel dev'i çek

```bash
git checkout dev
git pull origin dev
```

> ⚠️ Her yeni göreve başlamadan önce mutlaka bu adımı uygula.

### Adım 2 — Feature branch oluştur

```bash
git checkout -b feature/task-name
```

Örnekler:
```bash
git checkout -b feature/user-api
git checkout -b feature/login
git checkout -b fix/validation-bug
```

### Adım 3 — Geliştir

Dosyalarda değişiklikleri yap. Durumu takip et:

```bash
git status
git diff
```

### Adım 4 — Stage'e ekle

```bash
git add .                            # Tüm değişiklikler
git add src/routes/user.routes.ts    # Belirli dosya
git add src/                         # Belirli klasör
git restore --staged dosya.ts        # Stage'den geri al
```

### Adım 5 — Commit oluştur

```bash
git commit -m "feat(user): add create endpoint"
```

### Adım 6 — GitHub'a gönder

```bash
git push origin feature/user-api
```

İlk kez gönderiyorsan upstream ayarla:

```bash
git push -u origin feature/user-api
# Sonraki push'larda kısaca:
git push
```

### Adım 7 — Pull Request aç

GitHub arayüzünden `feature/user-api → dev` PR oluştur.

---

## 6. Commit Mesajları

### Format

```
<type>(<scope>): <kısa açıklama>
```

### Tipler

| Tip | Kullanım |
|-----|----------|
| `feat` | Yeni özellik |
| `fix` | Hata düzeltmesi |
| `refactor` | Çalışma mantığını değiştirmeyen kod düzenlemesi |
| `docs` | Dokümantasyon değişikliği |
| `test` | Test ekleme/düzenleme |
| `chore` | Bağımlılık güncelleme, config değişikliği |
| `style` | Kod formatı (boşluk, noktalı virgül vb.) |

### Örnekler

```bash
git commit -m "feat(auth): add login endpoint"
git commit -m "fix(user): resolve validation bug"
git commit -m "refactor(routes): simplify route structure"
git commit -m "docs: update README"
git commit -m "test(auth): add register tests"
git commit -m "chore: update dependencies"
```

### İyi / Kötü Commit Mesajı

```bash
# ❌ Kötü
git commit -m "düzeltme"
git commit -m "changes"
git commit -m "wip"

# ✅ İyi
git commit -m "fix(auth): handle expired token error"
git commit -m "feat(product): add pagination to list endpoint"
```

### Commit Geçmişi

```bash
git log                  # Detaylı geçmiş
git log --oneline        # Özet geçmiş
git log --oneline --graph # Branch grafiği ile
git show <commit-hash>   # Belirli commit detayı
```

---

## 7. Pull Request (PR) Süreci

### PR Nedir?

Feature branch'ini dev branch'ine merge etmeden önce ekibin kodu incelemesi için açılan istek.

### PR Açma (GitHub Arayüzü)

1. GitHub'da repoyu aç
2. **Pull requests → New pull request** tıkla
3. **base:** `dev` ← **compare:** `feature/user-api` seç
4. Başlık ve açıklama yaz
5. **Create Pull Request** tıkla

### İyi Bir PR Açıklaması

```markdown
## Ne yaptım?
Kullanıcı oluşturma endpoint'i eklendi.

## Nasıl test edilir?
POST /users — body: { username, email, password }

## Ekran görüntüsü (varsa)
...

## Checklist
- [x] Kod çalışıyor
- [x] Test yazıldı
- [x] Dokümantasyon güncellendi
```

---

## 8. Code Review

### Reviewer'ın Yapması Gerekenler

- **GitHub → Files changed** sekmesinden kodu incele
- Satır üzerine tıklayarak yorum ekle
- Genel yorum için **Review changes** kullan

### Geliştirici Yorum Aldığında

```bash
# Düzeltmeleri yap
git add .
git commit -m "fix: address review comments"
git push origin feature/user-api
```

> PR otomatik güncellenir. Yeni PR açmaya gerek yoktur.

### Review Sonuçları

| Durum | Anlam |
|-------|-------|
| ✅ Approved | Merge edilebilir |
| 💬 Comment | Bilgi amaçlı yorum, bloklayan değil |
| ❌ Changes requested | Düzeltme yapılması gerekiyor |

---

## 9. Merge ve Conflict Çözme

### Merge Nedir?

İki branch'in değişikliklerini birleştirme işlemi.

```bash
git checkout dev
git merge feature/user-api
```

### Fast-forward vs Merge Commit

```bash
git merge feature/branch          # Otomatik (fast-forward mümkünse)
git merge --no-ff feature/branch  # Her zaman merge commit oluştur
```

### Conflict Nedir?

İki kişi aynı dosyanın aynı satırını değiştirirse Git hangisinin doğru olduğunu bilemez:

```
<<<<<<< HEAD (senin değişikliğin)
const port = 3000;
=======
const port = 5000;
>>>>>>> dev (dev branch'inden gelen)
```

### Conflict Çözme

```bash
# 1. Güncel dev'i feature branch'ine çek
git checkout feature/user-api
git merge dev

# 2. Conflict olan dosyaları düzenle
#    <<<, ===, >>> işaretlerini sil, doğru kodu bırak

# 3. Çözülen dosyaları ekle
git add .
git commit -m "resolve merge conflicts"
git push origin feature/user-api
```

### Conflict Önleme İpuçları

- Her gün `git pull origin dev` ile güncel kal
- Küçük ve odaklı feature branch'ler oluştur
- Uzun süre açık kalan PR'lardan kaçın

---

## 10. Sık Kullanılan Komutlar

### Durum ve Bilgi

```bash
git status                   # Değişiklikleri göster
git branch -vv               # Branch listesi ve remote bağlantıları
git log --oneline --graph    # Commit geçmişi (grafik)
git diff                     # Staged olmayan değişiklikler
git diff --staged            # Staged değişiklikler
git stash                    # Değişiklikleri geçici sakla
git stash pop                # Saklananları geri getir
```

### Geri Alma

```bash
git restore dosya.ts          # Çalışma dizinindeki değişikliği geri al
git restore --staged dosya.ts # Stage'den geri al
git revert <hash>             # Commit'i geri alan yeni commit oluştur (güvenli)
git reset --soft HEAD~1       # Son commit'i geri al (değişiklikler kalır)
git reset --hard HEAD~1       # Son commit'i tamamen sil ⚠️ dikkatli kullan
```

### Remote

```bash
git remote -v                          # Remote URL'leri göster
git remote add origin <url>            # Remote ekle
git fetch origin                       # Uzaktaki değişiklikleri indir (merge etmeden)
git pull origin dev                    # Fetch + merge
git push origin feature/task-name      # Branch'i gönder
git push origin --delete feature/done  # Remote branch'i sil
```

---

## 11. GitHub Arayüzü

### Önemli Sekmeler

| Sekme | İçerik |
|-------|--------|
| **Code** | Dosya gezgini, branch seçimi |
| **Issues** | Görev ve hata takibi |
| **Pull requests** | Açık/kapalı PR'lar |
| **Actions** | CI/CD pipeline'ları |
| **Settings** | Repo ayarları, branch korumaları |

### Branch Koruma Kuralları (Settings → Branches)

Ekip liderinin ayarlaması önerilir:

- `main` ve `dev` branch'lerine doğrudan push engeli
- PR açılmadan merge yapılamaz
- En az 1 onay zorunluluğu

### Issue ve PR Bağlantısı

PR açıklamasına şunu ekleyerek Issue'yu otomatik kapat:

```
Closes #42
Fixes #17
```

---

## 12. Yeni Task Checklist

### Göreve Başlarken

```bash
git checkout dev
git pull origin dev
git checkout -b feature/task-name
```

### Geliştirme Sonrası

```bash
git add .
git commit -m "feat: complete task description"
git push origin feature/task-name
```

### GitHub'da

- `feature/task-name → dev` Pull Request aç
- Açıklama yaz, reviewer ata
- Review sonrası düzeltmeleri push et
- Onay alındıktan sonra merge et

---

## Özet Akışı

```
dev (güncel)
  │
  ▼
feature/task-name oluştur
  │
  ▼
Kod geliştir
  │
  ▼
git add → git commit → git push
  │
  ▼
Pull Request aç (feature → dev)
  │
  ▼
Code Review
  │
  ├── Düzeltme gerekiyorsa → fix commit → push → PR güncellenir
  │
  ▼
Onay (Approved)
  │
  ▼
Merge → dev
```

---

> 💡 **İpucu:** Bir konuda takıldığında önce `git status` ve `git log --oneline` çalıştır. Çoğu durumda nerede olduğunu anlamak sorunu çözer.

> 💡 **Yeni task aldığında:** Projeyi açtın, dev branch'indesin — ilk yapacağın şey `git pull origin dev`. Pull atmadan branch açarsan arkadaşların son eklediği kodlar olmadan çalışmaya başlarsın, sonunda merge conflict çıkar.
> ```
> GitHub'daki dev  ──►  senin bilgisayarındaki dev  ──►  yeni feature branch
>    (güncel)              (pull ile güncelle)            (burda çalışırsın)
> ```
> **Kural: Yeni branch açmadan önce her zaman `git pull`.**







Evet, tam olarak burada çalıştırırsın.
Mantığı şöyle düşün:
GitHub'daki dev  ──►  senin bilgisayarındaki dev  ──►  yeni feature branch
   (güncel)              (pull ile güncelle)            (burda çalışırsın)
Sıra şu:
bash# 1. dev branch'ine geç (zaten oradaysan gerek yok)
git checkout dev

# 2. GitHub'daki son hali çek
git pull origin dev

# 3. Artık yeni branch oluştur
git checkout -b feature/task-name


dun yasadıgım sorun a istinaden

# 🌿 GIT & GITHUB KULLANIM REHBERİ

> Hangi branch'teyken ne yapmalısın? Hatalar neden olur? Tüm aksiyonlar adım adım.

---

## 📌 TEMEL KAVRAMLAR

| Kavram | Ne demek? |
|--------|-----------|
| `local` | Sadece kendi bilgisayarında olan |
| `remote (origin)` | GitHub'daki versiyon |
| `branch` | Bağımsız çalışma kolu |
| `commit` | Yerel kayıt noktası |
| `push` | Local → GitHub'a gönder |
| `pull` | GitHub → Local'e getir |
| `merge` | İki branch'i birleştir |
| `conflict` | Aynı satırda iki farklı değişiklik çakışması |
| `staging` | Commit'e hazır alan (`git add` ile eklenir) |

---

## 🌲 BRANCH YAPISI (Örnek Proje)

```
main / master       → canlı, dokunulmaz
    └── dev         → test ortamı, herkes buraya merge eder
         ├── elif   → senin branch'in
         ├── ayla   → arkadaşının branch'i
         └── duygu  → diğer arkadaşının branch'i
```

---

## ✅ GÜNLÜK DOĞRU WORKFLOW

### 1️⃣ Güne başlarken — kendi branch'inde
```bash
git switch elif              # kendi branch'ine geç
git pull origin elif         # GitHub'daki son halini al
```

### 2️⃣ Kodunu yaz, kaydet

### 3️⃣ Çalışmanı kaydet (sık sık yap!)
```bash
git add .
git commit -m "ne yaptığını açıkla"
```

### 4️⃣ Dev'deki güncellemeleri al (günde 1-2 kez)
```bash
git pull origin dev          # dev'deki yenilikleri branch'ine çek
# conflict çıkarsa çöz, sonra:
git add .
git commit -m "merge dev into elif"
```

### 5️⃣ Bitince GitHub'a gönder
```bash
git push origin elif
```

### 6️⃣ PR (Pull Request) aç
GitHub'da `elif → dev` yönünde PR aç, arkadaşların incelesin.

---

## 🔀 MERGE İŞLEMİ

### Merge nedir?
İki branch'teki değişiklikleri birleştirmektir.

### Merge nasıl yapılır? (elif branch'indeyken dev'i almak)
```bash
git switch elif
git merge origin/dev
```

### ⚠️ MERGE SIRASINDA ASLA:
- Branch değiştirme
- Yeni `git pull` yapma
- Bilgisayarı kapatma

### Merge tamamlanınca:
```bash
git add .
git commit        # otomatik mesaj gelir, onayla
git push origin elif
```

---

## 💥 CONFLICT (ÇAKIŞMA) ÇÖZME

### Conflict nedir?
Sen ve arkadaşın aynı dosyanın aynı satırını değiştirmiştir.

### Conflict işareti dosyada şöyle görünür:
```
<<<<<<< HEAD
senin yazdığın kod
=======
arkadaşının yazdığı kod
>>>>>>> dev
```

### Çözüm adımları:
1. Dosyayı aç
2. `<<<<<<<`, `=======`, `>>>>>>>` satırlarını sil
3. Doğru kodu bırak (ikisini birleştirebilirsin)
4. Kaydet

```bash
git add .
git commit
```

---

## 🚨 SIK YAPILAN HATALAR VE ÇÖZÜMLERİ

### ❌ Hata 1: `(elif|MERGING)` — Merge yarıda kaldı

**Neden olur?**
Merge sırasında branch değiştirdin veya editör çöktü.

**Çözüm:**
```bash
# Devam etmek istiyorsan:
git add .
git commit

# İptal etmek istiyorsan:
git merge --abort
```

---

### ❌ Hata 2: Editor hatası (nano çöküyor)

**Neden olur?**
Git varsayılan editör olarak nano kullanıyor, nano terminal'de çalışmıyor.

**Kalıcı çözüm (bir kere yap, bir daha çıkmaz):**
```bash
git config --global core.editor "notepad"
```

---

### ❌ Hata 3: `Your branch is ahead of origin by X commits`

**Ne demek?**
Commit yaptın ama henüz push etmedin. GitHub'da yok.

**Çözüm:**
```bash
git push origin elif
```

---

### ❌ Hata 4: Dosyaların üstü çizili görünüyor (VS Code'da)

**Neden olur?**
Git o dosyaları "silindi" olarak işaretlemiş. Genelde yanlış merge sonrası olur.

**Kontrol et:**
```bash
git status
git log --oneline -5
```

**Eğer yanlış merge olduysa geri al:**
```bash
git reset --hard HEAD~1
```

---

### ❌ Hata 5: `reset --hard` yaptın, kodlar gitti

**Neden olur?**
`reset --hard` commit geçmişini geri sarar. Commit etmediğin şeyler gider ama commit ettiklerin kaybolmaz.

**Geri getirme:**
```bash
git reflog                        # tüm geçmişi gösterir
git reset --hard <commit-hash>    # istediğin noktaya dön
```

Örnek:
```bash
git reflog
# fbc8d2c HEAD@{5}: commit: feat(adminRoleslayer)
git reset --hard fbc8d2c
```

---

### ❌ Hata 6: Yanlış branch'te çalıştın

**Kontrol et:**
```bash
git branch        # * olan aktif branch'i gösterir
```

**Değişikliklerini kaydet, doğru branch'e geç:**
```bash
git add .
git stash                # değişiklikleri geçici sakla
git switch elif          # doğru branch'e geç
git stash pop            # değişiklikleri geri getir
```

---

### ❌ Hata 7: `push` reddedildi (rejected)

**Neden olur?**
GitHub'da senin bilmediğin commit'ler var, önce pull yapman lazım.

**Çözüm:**
```bash
git pull origin elif
# conflict çıkarsa çöz
git push origin elif
```

**Eğer geçmişi değiştirdiysen (reset --hard sonrası):**
```bash
git push origin elif --force
```
> ⚠️ `--force` sadece kendi branch'inde kullan, dev/main'de asla!

---

## 🔍 DURUMU ANLAMAK İÇİN KOMUTLAR

```bash
git status              # ne var ne yok
git log --oneline -5    # son 5 commit
git branch              # hangi branch'tesin
git reflog              # tüm geçmiş (kayıp commit bul)
git diff                # neyi değiştirdin
```

---

## 🧠 ALTIN KURALLAR

1. **Her şeyden önce commit et** — `git add . && git commit -m "wip"` alışkanlık yap
2. **Merge yapmadan önce** — branch'inin clean olduğundan emin ol
3. **`reset --hard` yapmadan önce** — `git reflog` ile geri dönebileceğinden emin ol
4. **`--force` sadece kendi branch'inde** — dev/main'e asla force push yapma
5. **Conflict çıkınca paniklemе** — dosyayı aç, işaretleri sil, doğru kodu bırak

---

## 📋 HIZLI BAŞVURU TABLOSU

| Ne yapmak istiyorsun? | Komut |
|-----------------------|-------|
| Branch değiştir | `git switch elif` |
| Değişiklikleri kaydet | `git add . && git commit -m "mesaj"` |
| GitHub'a gönder | `git push origin elif` |
| GitHub'dan al | `git pull origin elif` |
| Dev'i branch'ine al | `git merge origin/dev` |
| Merge'i iptal et | `git merge --abort` |
| Son commit'i geri al | `git reset --hard HEAD~1` |
| Kayıp commit'i bul | `git reflog` |
| Geçici sakla | `git stash` |
| Saklananı geri getir | `git stash pop` |
| Durumu kontrol et | `git status` |