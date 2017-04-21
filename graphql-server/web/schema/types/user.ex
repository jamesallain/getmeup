defmodule Getmeup.Schema.Types.User do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Getmeup.Repo

  object :user do
    field :id, :id
    field :name, :string
    field :email, :string
    field :password_hash, :string
    field :roles, list_of(:string)
    field :bio, :string
    field :avatar, :string
    field :token, :string
  end
end
