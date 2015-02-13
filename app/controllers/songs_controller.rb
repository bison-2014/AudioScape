class SongsController < ApplicationController

  def index

  end

  def new

  end

  def show
    @spot_song = Song.find(params[:id])
  end

  def create

  end

  def destroy

  end

  def update

  end

  def search

  end
end
