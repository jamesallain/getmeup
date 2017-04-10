defmodule Getmeup.UserResolver do
  alias Getmeup.Repo
  alias Getmeup.User

  require IEx;

  @seven_days_in_ms 7*24*3600*1000

  def all(_args, %{context: %{current_user: current_user}}) do
    IO.inspect current_user
    {:ok, Repo.all(User)}
  end

  def all(_args, _info) do
    {:error, "Not authorized."}
  end


  def sign_up(args, _info) do
    changeset = User.changeset(%User{}, args)
    case Repo.insert(changeset) do
      {:ok, user} ->
        {:ok, Map.put_new(user, :token, User.generate_token(%{
            user_id: user.id,
            expired_at: DateTime.to_unix(DateTime.utc_now(), :milliseconds) + @seven_days_in_ms
          }
        ))}

      {:error, changeset} ->
        {:error, %{
          message: "Error happened when insert user",
          details: changeset
            |> Ecto.Changeset.traverse_errors(fn
              {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
              msg -> msg
            end)
          }
        }
    end
  end

  def sign_in(args, _info) do
    user = Repo.get_by(User, email: String.downcase(args[:email]))
    case User.authenticate(user, args[:password]) do
      true -> {:ok, Map.put_new(user, :token, User.generate_token(%{
            user_id: user.id,
            expired_at: DateTime.to_unix(DateTime.utc_now(), :milliseconds) + @seven_days_in_ms
          }
        ))}

      _ -> {:error, "Email or password is incorrect!"}
    end
  end

  def sign_out(_args, _info) do
    {:ok, %{token: User.generate_token(%{
        expired_at: DateTime.to_unix(DateTime.utc_now(), :milliseconds) - 1000
      })}
    }
  end
end