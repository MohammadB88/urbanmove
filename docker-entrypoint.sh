#!/bin/sh
set -e

# Default values
API_URL="${MODEL_API_URL:-http://localhost:8000}"

# Create a config file that will be injected into the React app
cat > /usr/share/nginx/html/config.js << EOF
window.MODEL_API_URL = '$API_URL';
EOF

# Ensure proper permissions
chmod 644 /usr/share/nginx/html/config.js
chown nginx:nginx /usr/share/nginx/html/config.js

# Switch to nginx user and start Nginx
exec su -s /bin/sh nginx -c "nginx -g 'daemon off;'"