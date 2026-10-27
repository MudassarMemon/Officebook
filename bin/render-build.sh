#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Ruby gems
bundle install

# Build React frontend
cd frontend
npm install
npm run build
cd ..

# Compile Rails assets and run migrations
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
