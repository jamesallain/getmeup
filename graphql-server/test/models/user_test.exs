defmodule Getmeup.UserTest do
  use Getmeup.ModelCase

  alias Getmeup.User

  @valid_attrs %{bio: "some content", email: "some content", name: "some content", password_hash: "some content", role: []}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
