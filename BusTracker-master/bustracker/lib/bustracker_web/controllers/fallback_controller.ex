defmodule BustrackerWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use BustrackerWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(BustrackerWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(BustrackerWeb.ErrorView, :"404")
  end

  def call(conn, {:error, "invalid user-identifier"}) do
    #IO.inspect('Here')
    conn
    |> put_status(:not_found)
    |> render(BustrackerWeb.ErrorView, "404.json", msg: "User Invalid")
  end

  def call(conn, {:error, "invalid password"}) do
    #IO.inspect('Here')
    conn
    |> put_status(:not_found)
    |> render(BustrackerWeb.ErrorView, "401.json", msg: "Credentials mismatch. Please check your email / password");
  end
end
