#!/bin/bash
GITHUB_TOKEN=$GITHUB_GIST_TOKEN

# Répertoire du repository contenant les scripts et les notes
scripts_repo_dir="$(pwd)"

# Répertoire temporaire pour le GitBook
temp_gitbook_dir=$(mktemp -d)

github_repo_url="https://github.com/Craft-Academy/craftyreads/commit"

gist_base_url="https://gist.github.com/PCreations"

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

# Fonction pour créer un gist et retourner l'URL
create_gist() {
    local diff_content=$1
    local gist_name=$2
    
    # Utiliser une commande here document pour formater le contenu correctement
    local response=$(gh gist create --public --filename "$gist_name" -d "$gist_name" <<< "$diff_content")
    echo "$response"
}

# Fonction pour générer un hash à partir du contenu
generate_hash() {
    echo -n "$1" | sha256sum | awk '{print $1}'
}

# Fonction pour vérifier si un gist existe
gist_exists() {
    local short_hash=$1
    gh gist list --limit 100 | grep -q "$short_hash"
}

# Fonction pour obtenir l'URL d'un gist existant
get_gist_url() {
    local short_hash=$1
    local gist_id=$(gh gist list --limit 100 | grep "$short_hash" | awk '{print $1}')
    echo "$gist_base_url/$gist_id"
}

# Parcourir les commits et extraire les notes
cd "$scripts_repo_dir"
commits=$(git rev-list --reverse HEAD)
for commit_hash in $commits; do
    echo "Processing commit $commit_hash..."
    note=$(git notes --ref="$notes_ref" show "$commit_hash" 2>/dev/null)
    if [ -n "$note" ]; then
        cd "$temp_gitbook_dir"
        # Je m'inspire du code de ChatGPT pour faire ce que je veux vraiment : ajouter un lien vers le commit dans le GitBook
        # AVANT la note
        echo "[Commit checkpoint]($github_repo_url/$commit_hash)" >> "$all_notes_file"
        echo "" >> "$all_notes_file"  # Ajouter une ligne vide entre chaque note

        # Buffer pour le contenu modifié de la note
        modified_note=""

        cd "$scripts_repo_dir"
        # Parcourir la note ligne par ligne
        while IFS= read -r line; do
            # if [[ "$line" == \`\`\`diff* ]]; then
            #     diff_content=""
            #     while IFS= read -r diff_line; do
            #         if [[ "$diff_line" == \`\`\` ]]; then
            #             break
            #         fi
            #         diff_content+="$diff_line"$'\n'
            #     done
                
            #     # Générer un hash pour le diff
            #     diff_hash=$(generate_hash "$diff_content")
            #     short_hash=${diff_hash:0:12}
            #     gist_name="${short_hash}.diff"
                
            #     # Vérifier si un gist avec ce nom existe déjà
            #     if gist_exists "$short_hash"; then
            #         # Obtenir l'URL du gist existant
            #         gist_url=$(get_gist_url "$short_hash")
            #     else
            #         # Créer un nouveau gist pour le diff et obtenir l'URL
            #         gist_url=$(create_gist "$diff_content" "$gist_name")
            #     fi
                
            #     echo $gist_url
            #     # Ajouter le bloc embed avec l'URL du gist
            #     modified_note+="{% embed url=\"$gist_url\" %}\n"
            # else
                modified_note+="$line\n"
            # fi
        done <<< "$note"

        cd "$temp_gitbook_dir"
        echo -e "$modified_note" >> "$all_notes_file"
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
