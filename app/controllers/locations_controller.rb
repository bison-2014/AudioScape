class LocationsController < ApplicationController

	def new
		@playlist = Playlist.find(params[:playlist_id])
		@location = Location.new
	end

	def create
		@playlist = Playlist.find(params[:playlist_id])
		@location = @playlist.locations.new(name: params[:location][:name], address: params[:location][:address])

		@tagging = Tagging.create(user: current_user, playlist: @playlist, location: @location)

		if @location.save
			redirect_to @playlist
		else
			render :new
		end
	end

	def show
		@playlist = Playlist.find(params[:playlist_id])
		@location = @playlist.locations.find(params[:id])
	end


end

