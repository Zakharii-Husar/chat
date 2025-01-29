#!/bin/bash

# Ensure Bash version compatibility
if [ -z "${BASH_VERSION}" ] || [ "${BASH_VERSINFO[0]}" -lt 4 ]; then
  echo "This script requires Bash version 4 or higher."
  exit 1
fi

# Generate accounts
for i in {1..50}; do
  # Generate random first and last names
  FIRST_NAME=$(shuf -n 1 /usr/share/dict/words | tr -dc 'a-zA-Z' | head -c 5)
  LAST_NAME=$(shuf -n 1 /usr/share/dict/words | tr -dc 'a-zA-Z' | head -c 7)
  
  # Lowercase and randomize user data
  EMAIL="${FIRST_NAME,,}${LAST_NAME,,}${RANDOM}@example.com"
  FULL_NAME="${FIRST_NAME^} ${LAST_NAME^}"
  USERNAME="${FIRST_NAME,,}${RANDOM:0:3}"
  
  # Static password
  PASSWORD="Password777#"

  # JSON payload
  JSON_PAYLOAD=$(cat <<EOF
{
  "Email": "$EMAIL",
  "FullName": "$FULL_NAME",
  "Password": "$PASSWORD",
  "UserName": "$USERNAME"
}
EOF
)

  # Send POST request
  RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$JSON_PAYLOAD" http://localhost:5190/chat-api/Auth/SignUp/WithPass)
  echo "$RESPONSE"
  echo "Sent POST request for account $EMAIL"
done
