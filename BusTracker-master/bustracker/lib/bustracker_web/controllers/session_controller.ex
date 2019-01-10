defmodule BustrackerWeb.SessionController do
  use BustrackerWeb, :controller

  alias Bustracker.Users
  alias Bustracker.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    #IO.inspect(email)
    #IO.inspect(password)
    user = Accounts.get_user_by_email(email)
  end

  def delete(conn, _params) do
    #conn
    #|> delete_session(:user_id)
    #|> put_flash(:info, "Logged out")
    #|> redirect(to: page_path(conn, :index))
  end
end