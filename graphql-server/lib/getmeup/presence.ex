defmodule Getmeup.Presence do
  use Phoenix.Presence, otp_app: :getmeup, pubsub_server: Getmeup.PubSub
end