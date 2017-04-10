# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Getmeup.Repo.insert!(%Getmeup.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

import Comeonin.Bcrypt
alias Getmeup.Repo
alias Getmeup.User

# insert few users
Repo.insert!(%User{name: "Duc Dinh", email: "ducdinh@gmail.com", password_hash: hashpwsalt("0812112"), role: ["admin", "user"], bio: "Software Engineer"})
Repo.insert!(%User{name: "Paul Scholes", email: "schole@gmail.com", password_hash: hashpwsalt("0812111"), role: ["user"], bio: "Soccer player"})