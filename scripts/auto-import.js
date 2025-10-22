name: Auto Import Daily Games

# Déclenche l'action tous les jours à 9h00 UTC
on:
  schedule:
    - cron: '0 9 * * *'
  # Permet de lancer l'action manuellement depuis l'interface GitHub
  workflow_dispatch:

jobs:
  import-games:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run Game Importer Script
        # Exécute le fichier JS que tu viens de créer
        run: node scripts/auto-import.js

      - name: Commit and Push new games
        # Ajoute les modifications (nouveaux jeux) au dépôt
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "🤖 Auto: Ajout de 10 nouveaux jeux HTML5"
          branch: principal
