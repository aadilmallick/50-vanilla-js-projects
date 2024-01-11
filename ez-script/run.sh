#! /usr/bin/bash

echo "provide a folder name:"
read folder_name

while [ -z "$folder_name" ]
do
    echo "provide a folder name:"
    read folder_name
done

FOLDERPATH=src/$folder_name

mkdir $FOLDERPATH

cp ez-script/index.html $FOLDERPATH
touch $FOLDERPATH/index.ts
touch $FOLDERPATH/style.scss


echo "folder created at $FOLDERPATH"