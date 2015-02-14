class VisitorsController < ApplicationController
	before_action :authenticate_user!


  def index
    client = Grooveshark::Client.new
    session[:groove_session] = client.session
  end
  
end

