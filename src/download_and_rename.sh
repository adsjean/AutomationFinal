#!/bin/bash

# Check if urls.txt and filenames.txt files exist
if [ ! -f urls.txt ]; then
  echo "File urls.txt not found!"
  exit 1
fi

if [ ! -f filenames.txt ]; then
  echo "File filenames.txt not found!"
  exit 1
fi

if [ ! -f foldername.txt ]; then
  echo "File foldername.txt not found!"
  exit 1
fi

# Read Folder name
mapfile -t foldername < foldername.txt


# Create a directory to store downloaded files
DOWNLOAD_DIR="/home/st49935/public_html/content/4TB${foldername[$1]}"
mkdir -p $DOWNLOAD_DIR

# Read URLs and filenames into arrays
mapfile -t urls < urls.txt
mapfile -t filenames < filenames.txt

# Check if both files have the same number of lines
if [ ${#urls[@]} -ne ${#filenames[@]} ]; then
  echo "The number of URLs and filenames do not match!"
  exit 1
fi


# Loop through each URL and corresponding filename
for i in "${!urls[@]}"; do
  url="${urls[$i]}"
  filename="${filenames[$i]}"

  # Extract the file extension from the URL
  extension="${url##*.}"
  
  # Full path to the target file
  filepath="$DOWNLOAD_DIR/${filename}.${extension}"

  # Check if the file already exists
  if [ -f "$filepath" ]; then
    echo "File $filepath already exists. Skipping download."
  else
    # Download the file and rename it with the extracted extension
    echo "Downloading $url as ${filename}.${extension}..."
    wget -O "$filepath" "$url"
  fi
done

echo "Download and rename completed!"