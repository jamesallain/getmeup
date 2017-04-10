defmodule Getmeup.Router do
  use Getmeup.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    plug Getmeup.Context
  end

  scope "/", Getmeup do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api" do
    pipe_through :graphql

    forward "/", Absinthe.Plug, schema: Getmeup.Schema
  end

  forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Getmeup.Schema
end
