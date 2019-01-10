defmodule BustrackerWeb.UserController do
  use BustrackerWeb, :controller

  alias Bustracker.Users
  alias Bustracker.Users.User

  action_fallback BustrackerWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    #with {:ok, %User{} = user} <- Users.create_user(user_params) do
    #  conn
    #  |> put_status(:created)
    #  |> put_resp_header("location", user_path(conn, :show, user))
    #  |> render("show.json", user: user)
    #end
    
    hash_pwd = Comeonin.Argon2.hashpwsalt(user_params["new_user_pass"]);
    user = %{ name: user_params["new_user_name"], email: user_params["new_user_email"], password_hash: hash_pwd, mobnum: user_params["new_user_mob"]}
    with {:ok, %User{} = user} <- Users.create_user(user) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
    
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
