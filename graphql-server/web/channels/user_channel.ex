defmodule Getmeup.UserChannel do
  use Phoenix.Channel
  alias Getmeup.Presence

  def join("users:online", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    current_user = Map.delete(socket.assigns.current_user, :__meta__)
    push socket, "user_joined", current_user
    push socket, "presence_state", Presence.list(socket)
    {:ok, _} = Presence.track(socket, current_user.id, %{
      status: "online",
      name: current_user.name,
      avatar: current_user.avatar
    })
    {:noreply, socket}
  end
end