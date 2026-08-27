#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
marker_suffix=".base64-upload"

while IFS= read -r -d '' encoded_file; do
  target_file="${encoded_file%${marker_suffix}}"
  mkdir -p "$(dirname "${target_file}")"
  base64 --decode "${encoded_file}" > "${target_file}"
  rm "${encoded_file}"
done < <(find "${project_root}" -type f -name "*${marker_suffix}" -print0)
