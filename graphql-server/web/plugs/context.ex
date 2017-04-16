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
    IO.inspect "Authorization: "
    ["Bearer " <> token] = get_req_header(conn, "authorization")
    IO.inspect token
    with {:ok, %{user_id: user_id}} <- User.verify_token(token),
      user <- Repo.get(User, user_id),
      do: {:ok, %{current_user: user}}
  end
end