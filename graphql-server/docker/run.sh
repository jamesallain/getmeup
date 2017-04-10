#!/bin/bash
rm -rf _build deps

# Install Elixir Dependencies
mix local.hex --force
mix local.rebar --force
mix deps.get

# Compile Phoenix application
mix compile

# Create database & tables for app
mix ecto.create
mix ecto.migrate

mix phoenix.server