defmodule PhxchWeb.Router do
  use PhxchWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PhxchWeb do
    pipe_through :api
  end
end
