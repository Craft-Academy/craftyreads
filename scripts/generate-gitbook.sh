#!/bin/bash

# Répertoire du repository contenant les scripts et les notes
scripts_repo_dir="$(pwd)"

# Répertoire temporaire pour le GitBook
temp_gitbook_dir=$(mktemp -d)

# Cloner le repository GitBook
git clone git@github.com:Craft-Academy/craftyreads-book.git "$temp_gitbook_dir"

# Naviguer dans le répertoire cloné
cd "$temp_gitbook_dir"

# Réinitialiser le répertoire GitBook
rm -rf *
git clean -fd

# Dossier de contenu GitBook
mkdir -p content

# Générer SUMMARY.md
echo "# Summary" > SUMMARY.md
echo "* [Full page](content/full.md)" >> SUMMARY.md

# Dossier de contenu GitBook
mkdir -p content

# Fichier pour toutes les notes
all_notes_file="content/full.md"
echo "# Full page" > "$all_notes_file"

# Nom de la référence des notes
notes_ref="refs/notes/commits"

# Parcourir les commits et extraire les notes
cd "$scripts_repo_dir"
commits=$(git rev-list --reverse HEAD)
for commit_hash in $commits; do
    echo "Processing commit $commit_hash..."
    note=$(git notes --ref="$notes_ref" show "$commit_hash" 2>/dev/null)
    if [ -n "$note" ]; then
        cd "$temp_gitbook_dir"
        echo "$note" >> "$all_notes_file"
        echo "" >> "$all_notes_file"
        echo "" >> "$all_notes_file"  # Ajouter une ligne vide entre chaque note
        cd "$scripts_repo_dir"
    fi
done

cd "$temp_gitbook_dir"

# Ajouter tous les fichiers générés et faire un commit
git add .
git commit -m "Generate GitBook from commit notes"

# Pousser les changements vers le repository
git push origin main

# Nettoyer le répertoire temporaire
rm -rf "$temp_gitbook_dir"

echo "GitBook has been generated and pushed to the repository."
