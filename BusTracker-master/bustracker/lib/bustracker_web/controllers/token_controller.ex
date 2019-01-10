defmodule BustrackerWeb.TokenController do
  use BustrackerWeb, :controller
  alias Bustracker.Users.User

  action_fallback BustrackerWeb.FallbackController

  def create(conn, %{"email" => email, "password" => pass, "display_flag" => display_flag, 
  "new_user_name" => username, "new_user_email" => usermail, "new_user_mob" => usermob, "new_user_pass" => userpass, "new_user_confpass" => userpass}) do
    with {:ok, %User{} = user} <- Bustracker.Users.get_and_auth_user(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end