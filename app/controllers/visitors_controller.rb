class VisitorsController < ApplicationController
	before_action :authenticate_user!

  def index
    client = Grooveshark::Client.new
    session[:groove_session] = client.session
    @user = current_user
    @playlists = @user.playlists.last(5)
    # render 'index', layout: false
  end







end


