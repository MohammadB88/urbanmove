#!/bin/sh
set -e

API_URL="${MODEL_API_URL:-http://localhost:8000}"

cat > /tmp/config/config.js << EOF
window.MODEL_API_URL = '$API_URL';
EOF

chmod 644 /tmp/config/config.js

# Just run nginx normally
exec nginx -g 'daemon off;'
