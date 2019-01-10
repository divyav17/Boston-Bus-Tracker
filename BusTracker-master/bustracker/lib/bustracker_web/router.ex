defmodule BustrackerWeb.Router do
  use BustrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BustrackerWeb do
    pipe_through :browser # Use the default browser stack
    
    get "/", PageController, :index
    get "/schedule", PageController, :index
    get "/customschedule", PageController, :index
    post "/session", SessionController, :create
    delete "/session", SessionController, :delete
  end

  # Other scopes may use custom stacks.
   scope "/api/v1", BustrackerWeb do
     get "/stop_names", ExternalAPIController, :get_stop_names
     post "/stop_names", ExternalAPIController, :get_stop_names
     post "/token", TokenController, :create
     resources "/users", UserController, except: [:new, :edit]
     pipe_through :api
   end
end
