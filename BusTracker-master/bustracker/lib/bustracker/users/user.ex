defmodule Bustracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :mobnum, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :mobnum, :password, :password_hash])
    |> validate_required([:name, :email, :mobnum, :password_hash])
    |> unique_constraint(:email)
  end
end
