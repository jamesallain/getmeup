defmodule Getmeup.Context do
  @behaviour Plug
  import Plug.Conn

  alias Getmeup.{User, Repo}

  def init(opts), do: opts
  def call(conn, _) do
    case build_context(conn) do
      {:ok, context} -> put_private(conn, :absinthe, %{context: context})
      {:error, _reason} -> conn
      _ -> conn
    end
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    # sign_up, sign_in have no authorization header so those will fail & stop at first step
    # and go directly to sign_up, sign_in handler without verify_token
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
      {:ok, %{user_id: user_id}} <- User.verify_token(token),
      user <- Repo.get(User, user_id),
      do: {:ok, %{current_user: user}}
  end
end