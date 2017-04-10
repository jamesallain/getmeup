defmodule Getmeup.Repo.Migrations.UpdateRoleToRoles do
  use Ecto.Migration

  def change do
  	rename table(:users), :role, to: :roles
  end
end
