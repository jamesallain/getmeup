# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :getmeup,
  ecto_repos: [Getmeup.Repo]

# Configures the endpoint
config :getmeup, Getmeup.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "tfC13XnaSBEzND0Q/Wp1sgeQtUtGesq3vWYf+M48D+VOySvMI6vlh668P2UL3rYq",
  render_errors: [view: Getmeup.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Getmeup.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
