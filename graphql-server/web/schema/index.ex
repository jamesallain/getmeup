defmodule Getmeup.Schema do
  use Absinthe.Schema
  import_types Getmeup.Schema.Types.User

  query do
    field :users, list_of(:user) do
      resolve &Getmeup.UserResolver.all/2
    end

    field :current_user, :user do
      resolve &Getmeup.UserResolver.get_current_user/2
    end
  end

  mutation do
  	field :sign_up, :user do
      arg :name, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      arg :roles, list_of(:string)
      arg :bio, :string
      arg :avatar, :string

      resolve &Getmeup.UserResolver.sign_up/2
  	end

    field :sign_in, :user do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &Getmeup.UserResolver.sign_in/2
    end

    field :sign_out, :user do
      resolve &Getmeup.UserResolver.sign_out/2
    end

  end
end
