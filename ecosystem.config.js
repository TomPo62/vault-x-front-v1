module.exports = {
  apps: [
    {
      name: 'veltyr-frontend',
      script: 'node_modules/.bin/next',
      args: 'start -p 3003',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
