#!/bin/bash

# Nom de la référence des notes, par défaut 'refs/notes/commits'
notes_ref="refs/notes/commits"

# Sauvegarder l'ancien commit HEAD
old_commit=$(git rev-parse HEAD)

# Lire la note existante pour le commit HEAD
note=$(git notes --ref="$notes_ref" show "$old_commit" 2>/dev/null)

# Amender le commit
git commit --amend --no-edit

# Récupérer le nouvel identifiant de commit HEAD
new_commit=$(git rev-parse HEAD)

# Si une note existait sur l'ancien commit, la copier sur le nouveau commit
if [ -n "$note" ]; then
    echo "$note" | git notes --ref="$notes_ref" add -f -F - "$new_commit"
    echo "La note a été copiée du commit $old_commit vers le commit $new_commit."
else
    echo "Aucune note à copier depuis le commit $old_commit."
fi
