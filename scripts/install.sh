#!/bin/bash

# Chemin vers le fichier vimrc
VIMRC="/home/node/.vimrc"

# Chemin vers le fichier .zshrc
ZSHRC="/home/node/.zshrc"

# Fonction Vimscript à ajouter
VIMSCRIPT_FUNCTION="
function! InsertDiff(n)
    let l:n = a:n
    if l:n == ''
        let l:n = 1
    endif

    let l:reflog_cmd = 'git reflog show --pretty=format:%H -n 1 HEAD@{' . l:n . '}'
    let l:reflog_hash = system(l:reflog_cmd)
    let l:reflog_hash = substitute(l:reflog_hash, '\n', '', 'g')
    let l:diff_cmd = 'git diff ' . l:reflog_hash . ' HEAD'
    let l:diff = system(l:diff_cmd)
    let l:hunks = split(l:diff, '\n@@')

    let l:formatted_diff = ''
    for l:hunk in l:hunks
        if !empty(l:formatted_diff)
            let l:formatted_diff .= \"\n@@\"
        endif
        let l:formatted_diff .= \"\n\`\`\`diff\n\" . l:hunk . \"\n\`\`\`\n\"
    endfor

    execute \"normal! i\" . l:formatted_diff
endfunction
"

# Alias à ajouter
ALIAS="alias goops='/workspaces/craftyreads/scripts/git-amend-with-notes.sh'"

# Vérifier si la fonction existe déjà dans le vimrc
if ! grep -q "function! InsertDiff" "$VIMRC"; then
    # Ajouter la fonction au fichier vimrc
    echo "$VIMSCRIPT_FUNCTION" >> "$VIMRC"
    echo "La fonction InsertDiff a été ajoutée au fichier .vimrc"
else
    echo "La fonction InsertDiff existe déjà dans le fichier .vimrc"
fi

# Vérifier si l'alias existe déjà dans le .zshrc
if ! grep -q "alias goops=" "$ZSHRC"; then
    # Ajouter l'alias au fichier .zshrc
    echo "$ALIAS" >> "$ZSHRC"
    echo "L'alias goops a été ajouté au fichier .zshrc"
else
    echo "L'alias goops existe déjà dans le fichier .zshrc"
fi

git config --global --add safe.directory /workspaces/craftyreads