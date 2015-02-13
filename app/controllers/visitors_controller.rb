class VisitorsController < ApplicationController
	before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
    @playlists = @user.playlists.all
  end

end
	