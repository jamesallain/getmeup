defmodule Getmeup.UserChannel do
  use Phoenix.Channel

  def join("users:online", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    current_user = Map.delete(socket.assigns.current_user, :__meta__)
    push socket, "user_joined", current_user
    {:noreply, socket}
  end
end