class PlaylistsController < ApplicationController

  def index

  end

  def new
    @playlist = Playlist.new
  end

  def show
    @playlist = Playlist.find(params[:id])


  end

  def create
    @playlist = Playlist.create(title: params[:playlist][:title], user_id: current_user.id)

    redirect_to @playlist

  end

  def destroy

  end

  def update

  end
end
