defmodule BustrackerWeb.ExternalAPIView do
  use BustrackerWeb, :view
  alias BustrackerWeb.ExternalAPIView

  def render("index.json", %{stop_names: stop_names}) do
    %{
      data: render_many(stop_names, ExternalAPIView, "stop_names.json")
    }
  end


  def render("nearest_stop.json", %{stops: stops}) do
    %{
      nearby_stops: stops,
    }
  end

  def render("bus_list.json", %{bus: buslist}) do
    %{
      buslist: buslist,
    }
  end

  def render("allStop_list.json", %{ allStops: stop_names}) do
    %{
      allStops: stop_names,
    }
  end

  def render("custom_bus.json", %{ buses: buses}) do
    %{
      buses: buses,
    }
  end
  
  def render("schedule.json", %{ schedule: schedule}) do
    %{
      schedule: schedule,
    }
  end

end