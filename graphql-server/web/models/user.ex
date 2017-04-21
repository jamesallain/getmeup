defmodule Getmeup.User do
  use Getmeup.Web, :model
  import Comeonin.Bcrypt

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :roles, {:array, :string}
    field :bio, :string
    field :avatar, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :email, :password, :roles, :bio, :avatar])
    |> validate_required([:name, :email, :password, :roles])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 5)
    |> hash_password
  end

  defp hash_password(changeset) do
    if password = get_change(changeset, :password) do
      changeset
      |> put_change(:password_hash, hashpwsalt(password))
    else
      changeset
    end
  end

  def authenticate(user, password) do
    case user do
      nil -> false
      _ -> checkpw(password, user.password_hash)
    end
  end

  def generate_token(claims) do
    claims
    |> Joken.token
    |> Joken.with_signer(Joken.hs256("my_secret")) #TODO: using env var for this secret
    |> Joken.sign
    |> Joken.get_compact
  end

  defp parse_token(token) do
    token
    |> Joken.token
    |> Joken.with_signer(Joken.hs256("my_secret"))
    |> Joken.verify
  end

  defp is_expired(claims) do
    case claims["expired_at"] < DateTime.to_unix(DateTime.utc_now, :milliseconds) do
      true -> {:error, "Token is expired."}
      false -> {:ok, %{user_id: claims["user_id"]}}
    end
  end

  def verify_token(token) do
    with %{error: nil, claims: claims} <- parse_token(token),
      do: is_expired(claims)
  end
end
