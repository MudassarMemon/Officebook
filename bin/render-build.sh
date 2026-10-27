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

# Run database migrations
bundle exec rake db:migrate
