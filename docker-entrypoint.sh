#!/bin/sh
set -e

# Default values
MODEL_API_URL="${MODEL_API_URL:-http://localhost:8000}"

# Create a config file that will be injected into the React app
cat > /usr/share/nginx/html/config.js << EOF
window.MODEL_API_URL = '$MODEL_API_URL';
EOF

# Start Nginx
exec nginx -g "daemon off;"