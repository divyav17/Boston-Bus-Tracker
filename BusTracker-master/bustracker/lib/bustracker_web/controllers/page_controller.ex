defmodule BustrackerWeb.PageController do
  use BustrackerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
