defmodule Getmeup.Repo.Migrations.AddAvatarColumnToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :avatar, :string, default: "default-avatar.png"
    end
  end
end
