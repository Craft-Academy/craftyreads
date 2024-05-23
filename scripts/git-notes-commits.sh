#!/bin/bash

# Nom de la référence des notes, par défaut 'refs/notes/commits'
notes_suffix=${1:-commits}
notes_ref="refs/notes/$notes_suffix"

# Vérifier si un commit spécifique a été fourni, sinon utiliser HEAD
commit=${2:-HEAD}

# Fichier temporaire pour stocker le texte de la note
temp_file=$(mktemp)

# Lire la note existante pour le commit
existing_note=$(git notes --ref="$notes_ref" show "$commit" 2>/dev/null)

# Si une note existe, l'écrire dans le fichier temporaire pour édition
if [ -n "$existing_note" ]; then
    echo "$existing_note" > "$temp_file"
fi

# Ouvrir l'éditeur par défaut pour écrire/éditer la note
${EDITOR:-vi} "$temp_file"

# Lire le contenu du fichier temporaire après édition
note_content=$(cat "$temp_file")

# Ajouter ou mettre à jour la note pour le commit
git notes --ref="$notes_ref" add -f -m "$note_content" "$commit"

# Supprimer le fichier temporaire
rm "$temp_file"

echo "La note a été mise à jour pour le commit $commit sous la référence $notes_ref."