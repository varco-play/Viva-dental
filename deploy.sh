#!/bin/bash
# Viva Dental — GitHub + Vercel deploy
# Usage: cd ~/Desktop/claude/viva-dental && bash deploy.sh

set -e
echo ""
echo "🦷  Viva Dental — GitHub + Vercel Deploy"
echo "========================================="

# ── 1. Git commit ─────────────────────────────────────────────────────────────
echo ""
echo "1/3  Committing source code..."
git add -A
git diff --cached --quiet && echo "  Nothing new to commit." || git commit -m "feat: initial Viva Dental website"

# ── 2. GitHub ─────────────────────────────────────────────────────────────────
echo ""
echo "2/3  Pushing to GitHub..."

if ! command -v gh &>/dev/null; then
  echo "  gh CLI not found — installing via Homebrew..."
  brew install gh
fi

# Create repo if it doesn't exist yet, then push
gh repo create viva-dental \
  --public \
  --description "Viva Dental — dental clinic website (Next.js)" \
  --source=. \
  --remote=origin \
  --push 2>/dev/null \
  || git push -u origin HEAD

echo "  ✅  https://github.com/varcoplay/viva-dental"

# ── 3. Vercel ─────────────────────────────────────────────────────────────────
echo ""
echo "3/3  Deploying to Vercel..."

if ! command -v vercel &>/dev/null; then
  echo "  Vercel CLI not found — installing..."
  npm install -g vercel
fi

vercel --prod --yes

echo ""
echo "✅  All done! Copy the URL above and share it with the client."
