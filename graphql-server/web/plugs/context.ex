defmodule Getmeup.Context do
  @behaviour Plug
  import Plug.Conn

  alias Getmeup.{Repo, User}

  def init(opts), do: opts
  def call(conn, _) do
    case build_context(conn) do
      {:ok, context} ->
        put_private(conn, :absinthe, %{context: context})
      {:error, _reason} ->
        conn
      _ -> conn
    end
  end

  @doc """
  Return the current user context based on the authorization header
  """
  def build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
    {:ok, current_user} <- verify_token(token) do
      {:ok, %{current_user: current_user}}
    end
  end

  defp is_expired(claims) do
    if claims["expired_at"] < DateTime.to_unix(DateTime.utc_now, :milliseconds) do
       true
    else
      false
    end
  end

  defp verify_token(token) do
    case User.verify_token(token) do
      %{error: nil, claims: claims} ->
        if is_expired(claims) do
          {:error, "Token is expired."}
        else
          user = Repo.get(User, claims["user_id"])
          if user do
            {:ok, user}
          else
            {:error, "Not found user"}
          end
        end
      %{error: error} -> {:error, error}
    end
  end

end